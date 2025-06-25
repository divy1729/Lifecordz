package com.stemcell.service;

import com.stemcell.model.Order;
import com.stemcell.model.User;
import com.stemcell.repository.OrderRepository;
import com.stemcell.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;

    public Order createOrder(Order order) {
        order.setStatus("pending");
        order.setDate(LocalDateTime.now());

        // Fetch user details to set userName and userEmail
        java.util.Optional<User> userOpt = userService.getUserById(order.getUserId());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            order.setUserName(user.getFirstName() + " " + user.getLastName());
            order.setUserEmail(user.getEmail());
        }

        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Optional<Order> updateOrderStatus(String id, String status, Map<String, Object> paymentDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(status);
            order.setPaymentDetails(paymentDetails);

            // Fetch user details to set address and birthInfo
            userService.getUserById(order.getUserId()).ifPresent(user -> {
                order.setAddress(user.getAddress());
                order.setBirthInfo(user.getBirthInfo());
            });

            return orderRepository.save(order);
        });
    }

    public int getTotalRevenue() {
        return orderRepository.findAll().stream()
                .filter(order -> "paid".equalsIgnoreCase(order.getStatus()))
                .mapToInt(Order::getAmount)
                .sum();
    }

    public long getOrderCount() {
        return orderRepository.count();
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }
}
