package com.stemcell.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import com.stemcell.service.RazorpayService;
import com.stemcell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @Value("${razorpay.keySecret}")
    private String razorpaySecret;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount");
            String currency = (String) data.getOrDefault("currency", "INR");
            String receipt = (String) data.getOrDefault("receipt", "order_rcptid_11");

            Order order = razorpayService.createOrder(amount, currency, receipt);
            return ResponseEntity.ok(order.toString());
        } catch (RazorpayException e) {
            return ResponseEntity.status(500).body("Error creating order: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        try {
            String razorpayOrderId = data.get("razorpay_order_id");
            String razorpayPaymentId = data.get("razorpay_payment_id");
            String razorpaySignature = data.get("razorpay_signature");

            String payload = razorpayOrderId + "|" + razorpayPaymentId;
            String generatedSignature = hmacSHA256(payload, razorpaySecret);

            if (generatedSignature.equals(razorpaySignature)) {
                // Update order status to paid and attach payment details
                Map<String, Object> paymentDetails = new HashMap<>();
                paymentDetails.put("razorpay_order_id", razorpayOrderId);
                paymentDetails.put("razorpay_payment_id", razorpayPaymentId);
                paymentDetails.put("razorpay_signature", razorpaySignature);

                // Assuming receipt is same as order id or passed in some way
                orderService.updateOrderStatus(razorpayOrderId, "paid", paymentDetails);

                return ResponseEntity.ok("Payment verified successfully");
            } else {
                return ResponseEntity.status(400).body("Invalid signature");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying payment: " + e.getMessage());
        }
    }

    private String hmacSHA256(String data, String key) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        return Hex.encodeHexString(hash);
    }
}
