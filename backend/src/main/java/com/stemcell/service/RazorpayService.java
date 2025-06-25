package com.stemcell.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

    private RazorpayClient razorpayClient;

    public RazorpayService(@Value("${razorpay.keyId}") String keyId,
                          @Value("${razorpay.keySecret}") String keySecret) throws RazorpayException {
        this.razorpayClient = new RazorpayClient(keyId, keySecret);
    }

    public Order createOrder(int amount, String currency, String receipt) throws RazorpayException {
        JSONObject options = new JSONObject();
        options.put("amount", amount); // amount in the smallest currency unit
        options.put("currency", currency);
        options.put("receipt", receipt);
        options.put("payment_capture", 1); // auto capture

        return razorpayClient.Orders.create(options);
    }
}
