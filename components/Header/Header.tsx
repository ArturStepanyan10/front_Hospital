'use client'


import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import LogoIcon from './logoHosp.svg';
import LoginIcon from './LoginIcon.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Speciality } from '@/interfaces/specialization.interface';
import { Doctor } from '@/interfaces/doctor.interface';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [specialization, setSpecialization] = useState<Speciality[]>([])

    useEffect(() => {
        // Fetch data from the API
        fetch('https://localhost:7138/api/specializations')
            .then(response => response.json())
            .then((data: Speciality[]) => {
                console.log('Received data:', data);
                setSpecialization(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.navbar}>
                <Link href='../'><LogoIcon className={styles.logo} /></Link>
                <ul className={styles.ul}>
                    <li className={styles.dropdownParent}>Врачи
                        <ul className={styles.dropdown}>
                            {specialization.map(special => (
                                <li key={special.id}><Link href={`/Doctorsss/${encodeURIComponent(special.specialName)}`}>
                                    <span>{special.specialName}</span>
                                </Link></li>))}
                        </ul>
                    </li>
                    <Link href='/'><li>Запись на прием</li></Link>
                    <Link href='/'><li>Мед. карта</li></Link>
                    <Link href='/'><li>О нас</li></Link>
                </ul>
                <div className={styles.phoneNumbers}>
                    <p>8 (900) 589-52-17</p>
                    <p>8 (904) 599-87-15</p>
                    <p className={styles.freeCall}>Бесплатный звонок по России</p>
                </div>
                <a href="../login/" target="_black"><LoginIcon className={styles.login} /></a>
            </div>
        </header>
    );
};
