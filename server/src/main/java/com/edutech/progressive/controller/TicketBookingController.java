 package com.edutech.progressive.controller;

import com.edutech.progressive.entity.TicketBooking;
import com.edutech.progressive.service.impl.TicketBookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.SQLException;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TicketBookingController {

    @Autowired
    private TicketBookingServiceImpl ticketBookingServiceImpl;

    @GetMapping("/ticket")
    public ResponseEntity<List<TicketBooking>> getAllBookings() {
        try {
            return new ResponseEntity<>(ticketBookingServiceImpl.getAllTicketBookings(), HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/ticket")
    public ResponseEntity<Integer> createBooking(@RequestBody TicketBooking ticketBooking) {
        try {
            return new ResponseEntity<>(ticketBookingServiceImpl.createBooking(ticketBooking), HttpStatus.CREATED);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/ticket/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable int bookingId) {
        try {
            ticketBookingServiceImpl.cancelBooking(bookingId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ticket/user/{email}")
    public ResponseEntity<List<TicketBooking>> getBookingsByUserEmail(@PathVariable String email) {
        try {
            return new ResponseEntity<>(ticketBookingServiceImpl.getBookingsByUserEmail(email), HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}