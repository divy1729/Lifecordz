package com.stemcell.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Value("${groq.api.key}")
    private String groqApiKey;

    @PostMapping("/donor-query")
    public ResponseEntity<?> handleDonorQuery(@RequestBody Map<String, Object> payload) {
        String question = (String) payload.get("question");
        List<Map<String, String>> history = (List<Map<String, String>>) payload.get("history");

        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Question is required");
        }

        StringBuilder promptBuilder = new StringBuilder();
        if (history != null && !history.isEmpty()) {
            for (Map<String, String> msg : history) {
                String role = msg.get("role");
                String content = msg.get("content");
                if (role != null && content != null) {
                    promptBuilder.append(role.equals("user") ? "User: " : "Assistant: ");
                    promptBuilder.append(content).append("\n");
                }
            }
        }
        promptBuilder.append("User: ").append(question).append("\nAssistant:");

        String groqUrl = "https://api.groq.com/openai/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + groqApiKey);

        Map<String, Object> groqPayload = new HashMap<>();
        groqPayload.put("model", "llama3-70b-8192");
        groqPayload.put("messages", List.of(
            Map.of("role", "system", "content", "You are a helpful assistant for the stem cell banking application LifeCordz. If a user asks about their order status or 'where is my order', ask for their order ID if not provided, and reply with a placeholder status (since you do not have real-time data). If an admin asks for pending collection reports, reply with a placeholder list of pending reports. For all other queries, answer in 3-4 sentences, be concise and clear."),
            Map.of("role", "user", "content", promptBuilder.toString())
        ));
        groqPayload.put("max_tokens", 120);
        groqPayload.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(groqPayload, headers);
        try {
            Map response = restTemplate.postForObject(groqUrl, entity, Map.class);
            String answer = "No response from AI.";
            if (response != null && response.get("choices") != null) {
                List choices = (List) response.get("choices");
                if (!choices.isEmpty()) {
                    Map choice = (Map) choices.get(0);
                    Map message = (Map) choice.get("message");
                    if (message != null && message.get("content") != null) {
                        answer = message.get("content").toString();
                    }
                }
            }
            Map<String, String> result = new HashMap<>();
            result.put("answer", answer);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("AI service error: " + e.getMessage());
        }
    }
}
