import { DoctRout } from '../../../../components'



export default function DoctorsPage({ params }: { params: { specialization: string } }) {
    const decodedSpecialization = decodeURIComponent(params.specialization)

    return (

        <div>
            <h1>{decodedSpecialization}</h1>
            <DoctRout specialization={params.specialization} />

        </div>
    )
}