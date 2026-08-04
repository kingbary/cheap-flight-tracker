const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1';

// Mirrors com.naija_flight_tracker.backend.common.ApiResponse<T> on the backend.
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// Mirrors com.naija_flight_tracker.backend.airport.AirportSummary.
export interface AirportDto {
  code: string;
  name: string;
  subtitle: string;
}

// Mirrors com.naija_flight_tracker.backend.trending.TrendingResponse.
export interface TrendingDto {
  id: string;
  from: AirportDto;
  to: AirportDto;
  price: number;
  drop: number;
  label: string;
}

export async function getTrending(): Promise<TrendingDto[]> {
  const res = await fetch(`${API_BASE_URL}/trending`, { cache: 'no-store' });
  const body: ApiResponse<TrendingDto[]> = await res.json();
  return body.data;
}

// Mirrors com.naija_flight_tracker.backend.flight.FlightResponse.AirlineSummary.
export interface AirlineSummaryDto {
  code: string;
  name: string;
  mark: string;
  bg: string;
  fg: string;
}

// Mirrors com.naija_flight_tracker.backend.flight.FlightResponse.
export interface FlightDto {
  id: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  wasPrice: number;
  score: number;
  deal: string | null;
  airline: AirlineSummaryDto;
  origin: AirportDto;
  destination: AirportDto;
}

export async function getFlights(from: string, to: string): Promise<FlightDto[]> {
  const res = await fetch(`${API_BASE_URL}/flights?from=${from}&to=${to}`, { cache: 'no-store' });
  const body: ApiResponse<FlightDto[]> = await res.json();
  return body.data;
}

export async function getFlight(id: string): Promise<FlightDto> {
  const res = await fetch(`${API_BASE_URL}/flights/${id}`, { cache: 'no-store' });
  const body: ApiResponse<FlightDto> = await res.json();
  return body.data;
}

// Mirrors com.naija_flight_tracker.backend.alert.AlertResponse.
export interface AlertDto {
  id: string;
  createdAt: string; // ISO instant, e.g. "2026-08-01T12:28:39.607001Z"
  origin: AirportDto;
  destination: AirportDto;
  targetPrice: number;
  flight: FlightDto;
}

export async function getAlerts(): Promise<AlertDto[]> {
  const res = await fetch(`${API_BASE_URL}/alerts`, { cache: 'no-store' });
  const body: ApiResponse<AlertDto[]> = await res.json();
  return body.data;
}

// Mirrors com.naija_flight_tracker.backend.savedtrip.SavedTripResponse.
export interface SavedTripDto {
  id: string;
  origin: AirportDto;
  destination: AirportDto;
  targetPrice: number;
}

export async function getSavedTrip(from: string, to: string): Promise<SavedTripDto> {
  const res = await fetch(`${API_BASE_URL}/saved-trips?from=${from}&to=${to}`, { cache: 'no-store' });
  const body: ApiResponse<SavedTripDto> = await res.json();
  return body.data;
}

// Mirrors com.naija_flight_tracker.backend.savedtrip.TrackedTripResponse.
export interface TrackedTripDto {
  id: string;
  origin: AirportDto;
  destination: AirportDto;
  targetPrice: number;
  currentPrice: number | null; // null when there's no real Flight data for this route yet
  alertCount: number;
}

export async function getTrackedTrips(): Promise<TrackedTripDto[]> {
  const res = await fetch(`${API_BASE_URL}/saved-trips`, { cache: 'no-store' });
  const body: ApiResponse<TrackedTripDto[]> = await res.json();
  return body.data;
}

// Mirrors com.naija_flight_tracker.backend.dailyfare.DailyFareResponse.
export interface DailyFareDto {
  date: string; // ISO date, e.g. "2026-04-18"
  price: number;
}

export async function getDailyFares(from: string, to: string): Promise<DailyFareDto[]> {
  const res = await fetch(`${API_BASE_URL}/daily-fares?from=${from}&to=${to}`, { cache: 'no-store' });
  const body: ApiResponse<DailyFareDto[]> = await res.json();
  return body.data;
}
