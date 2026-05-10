package com.edutech.progressive.entity;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@Entity
public class TicketBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;
    private String email;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "match_id")
    private Match match;

    private int numberOfTickets;
    public TicketBooking(int bookingId, Match match, String email, int numberOfTickets) {
        this.bookingId = bookingId;
        this.match = match;
        this.email = email;
        this.numberOfTickets = numberOfTickets;
    }
    // public TicketBooking(String email, Match match, int numberOfTickets) {
    //     this.email = email;
    //     this.match = match;
    //     this.numberOfTickets = numberOfTickets;
    // }
    public TicketBooking() {
    }
    public int getBookingId() {
        return bookingId;
    }
    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
    public Match getMatch() {
        return match;
    }
    public void setMatch(Match match) {
        this.match = match;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public int getNumberOfTickets() {
        return numberOfTickets;
    }
    public void setNumberOfTickets(int numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

}