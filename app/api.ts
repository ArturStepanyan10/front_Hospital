
import Cors from 'cors';
import { Service } from '../interfaces/service.interface';
import { initMiddleware } from '../lib/init-middleware';
import { Specialty } from '../interfaces/specialization.interface';
import { Doctor } from '../interfaces/doctor.interface';
import { Patient } from '../interfaces/patient.interface';
import { Schedule } from '../interfaces/schedules.interface';


const corsMiddleware = initMiddleware(
    Cors({
        methods: ['GET', 'POST'],
    })
);

//Получение списка мед. услуг
export const getServices = async (): Promise<Service[]> => {
    try {
        const response = await fetch("http://localhost:8080/api/medical-service/all");
        if (!response.ok) {
            throw new Error(`Failed to fetch services data: ${response.status} - ${response.statusText}`);
        }
        const services: Service[] = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services data:', error);
        throw error; // Propagate the error to the caller
    }
};

//Получение списка специализаций
export const getSpecializations = async (): Promise<Specialty[]> => {
    try {
        const response = await fetch("http://localhost:8080/api/specialty/all");
        if (!response.ok) {
            throw new Error('Failed to fetch services data');
        }
        const services: Specialty[] = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services data:', error);
        return [];
    }

};

export const getDoctorsData = async (): Promise<Doctor[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/doctor/all');
        if (!response.ok) {
            throw new Error('Failed to fetch doctors data');
        }
        const doctors: Doctor[] = await response.json();
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors data:', error);
        return [];
    }
};


export const getPatientsData = async (): Promise<Patient[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/patient/all');
        if (!response.ok) {
            throw new Error('Failed to fetch patients data');
        }
        const patients: Patient[] = await response.json();
        return patients;
    } catch (error) {
        console.error('Error fetching patients data:', error);
        return [];
    }
};

export const getDoctorsBySpecialization = async (specialization: string) => {
    try {
        const response = await fetch(`http://localhost:8080/api/doctor/searchBySpec?specialtyName=${specialization}`);
        if (!response.ok) {
            throw new Error('Failed to fetch doctors data');
        }
        const doctors = await response.json();
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors data:', error);
        return [];
    }
};






