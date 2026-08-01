package com.naija_flight_tracker.backend.trending;

import com.naija_flight_tracker.backend.airport.Airport;
import jakarta.persistence.*;

@Entity
public class Trending {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_code")
    private Airport from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_code")
    private Airport to;

    private int price;

    private int priceDrop;

    private String label;

    protected Trending() {
    }

    public Trending(Airport from, Airport to, int price, int priceDrop, String label) {
        this.from = from;
        this.to = to;
        this.price = price;
        this.priceDrop = priceDrop;
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public Airport getFrom() {
        return from;
    }

    public void setFrom(Airport from) {
        this.from = from;
    }

    public Airport getTo() {
        return to;
    }

    public void setTo(Airport to) {
        this.to = to;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getPriceDrop() {
        return priceDrop;
    }

    public void setPriceDrop(int priceDrop) {
        this.priceDrop = priceDrop;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}