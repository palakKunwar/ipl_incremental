package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.TicketBooking;
import com.edutech.progressive.repository.TicketBookingRepository;

@Service
public class TicketBookingServiceImpl {

    @Autowired
    private TicketBookingRepository ticketBookingRepository;

    public TicketBookingServiceImpl() {
    }

    public TicketBookingServiceImpl(TicketBookingRepository ticketBookingRepository) {
        this.ticketBookingRepository = ticketBookingRepository;
    }

    public List<TicketBooking> getAllTicketBookings() throws SQLException {
        return ticketBookingRepository.findAll();
    }

    public int createBooking(TicketBooking ticketBooking) throws SQLException {
        TicketBooking savedBooking = ticketBookingRepository.save(ticketBooking);
        return savedBooking.getBookingId();
    }

    public void cancelBooking(int bookingId) throws SQLException {
        ticketBookingRepository.deleteById(bookingId);
    }

    public List<TicketBooking> getBookingsByUserEmail(String email) throws SQLException {
        return ticketBookingRepository.findByEmail(email);
    }
}