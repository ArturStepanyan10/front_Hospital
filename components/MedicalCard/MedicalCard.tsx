'use client'

import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/setCookie';
import { Patient } from '../../interfaces/patient.interface';
import { decodeJWTToken } from '../../utils/decodeJWT';
import styles from '../MedicalCard/MedicalCard.module.css'
import { Admission } from '../../interfaces/admission.interface';
import { Doctor } from '../../interfaces/doctor.interface';
import { getDoctorsData } from '../../app/api';
import { MedicalReport } from '../../interfaces/medicalReport.interface';


export const MedicalCard = () => {
    const [patient, setPatient] = useState<Patient>();
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [medReport, setMedReport] = useState<MedicalReport[]>([]);
    const [doctor, setDoctor] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchPatient = async () => {
            const token = getCookie("accessToken");
            if (!token) return;

            try {
                const decodedToken = decodeJWTToken(token);
                const response = await fetch(`http://localhost:8080/api/patient/search/${decodedToken.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const patientData = await response.json();
                setPatient(patientData);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchAdmissionsByPatient = async () => {
            if (!patient) return;
            try {
                const response = await fetch(`http://localhost:8080/api/admissions/searchByPatient/${patient.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const admissionsData = await response.json();
                setAdmissions(admissionsData);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };

        fetchAdmissionsByPatient();
    }, [patient]);

    useEffect(() => {
        const fetchMedReportByPatient = async () => {
            if (!patient) return;

            try {
                const response = await fetch(`http://localhost:8080/api/medical-reports/searchByPatient/${patient.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const medReportData = await response.json();
                setMedReport(medReportData);
            } catch (error) {
                console.error('Error fetching medical reports:', error);
            }
        };

        fetchMedReportByPatient();
    }, [patient]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getDoctorsData();
            setDoctor(data);
        };

        fetchDoctors();
    }, []);

    const isPastAppointment = (dateString: Date, timeString: string) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const appointmentDate = new Date(dateString);
        appointmentDate.setHours(hours, minutes);
        const currentDate = new Date();

        return appointmentDate < currentDate;
    };

    return (
        <div className={styles.medcard}>
            <div className={styles.patientinfo}>
                <h2>Пациент: {`${patient?.lastName} ${patient?.firstName}`}</h2>
                <p>Полных лет: {`${patient?.age}`}</p>
                <p>Номер телефона: {`${patient?.phoneNumber}`}</p>
                <p>СНИЛС: {`${patient?.snils}`}</p>
            </div>

            <div className={styles.appointments}>
                <br />
                <h2>Ближайшие приемы:</h2>
                {admissions.map(admission => (
                    <div key={admission.id}>
                        {!isPastAppointment(admission.date, admission.time) && (
                            <div>
                                {doctor.find(d => d.id === admission.doctorId) && (
                                    <p className={styles.doctorInfo}>Доктор: {doctor.find(d => d.id === admission.doctorId)?.lastName} {doctor.find(d => d.id === admission.doctorId)?.firstName}</p>
                                )}
                                <p>Дата и время: {new Date(admission.date).toLocaleDateString()} {admission.time}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.pastAppointments}>
                <br />
                <h2>Прошедшие приемы:</h2>
                {admissions.map(admission => (
                    <div key={admission.id}>
                        {isPastAppointment(admission.date, admission.time) && (
                            <div>
                                {doctor.find(d => d.id === admission.doctorId) && (
                                    <p className={styles.doctorInfo}>Доктор: {doctor.find(d => d.id === admission.doctorId)?.lastName} {doctor.find(d => d.id === admission.doctorId)?.firstName}</p>
                                )}
                                <p>Дата и время: {new Date(admission.date).toLocaleDateString()} {admission.time}</p>

                                {medReport.find(r => r.admissionId === admission.id) && (
                                    <p>Результаты приема: {medReport.find(r => r.admissionId === admission.id)?.report}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
