package com.naija_flight_tracker.backend.common;

// <T> is a type placeholder — ApiResponse<List<Airport>>, ApiResponse<Airport>,
// ApiResponse<List<Flight>> etc. all reuse this one class, with the compiler
// still knowing exactly what `data` holds in each case.
public class ApiResponse<T> {

    private int status;
    private String message;
    private T data;

    protected ApiResponse() {
        // no-arg constructor for Jackson (the JSON library) to use when deserializing
    }

    private ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    // Static factory methods: instead of every controller writing
    // `new ApiResponse<>(200, "...", data)`, they write the more readable
    // `ApiResponse.success("...", data)`.
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data);
    }

    public static <T> ApiResponse<T> error(int status, String message) {
        return new ApiResponse<>(status, message, null);
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
