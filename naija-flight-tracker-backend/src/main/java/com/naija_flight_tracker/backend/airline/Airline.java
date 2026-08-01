package com.naija_flight_tracker.backend.airline;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Airline {

    @Id
    private String code; // e.g. "AP"

    private String name;

    private String mark;

    private String bg;

    private String fg;

    protected Airline() {
    }

    public Airline(String code, String name, String mark, String bg, String fg) {
        this.code = code;
        this.name = name;
        this.mark = mark;
        this.bg = bg;
        this.fg = fg;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getMark() {
        return mark;
    }

    public String getBg() {
        return bg;
    }

    public String getFg() {
        return fg;
    }
}
