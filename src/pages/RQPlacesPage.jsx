import {useQuery} from "react-query";
import axios from "axios";

const fetchPlaces = () => axios.get('http://localhost:4000/places');

export const RQPlacesPage = () => {

    const {isLoading, data, error, isError, isFetching} = useQuery('places-query', fetchPlaces, {
        cacheTime: 5000, // Default 5 minutes
        staleTime: 0,
        refetchOnMount: true, // Nos indica que react-query ejecute la petición cada vez que el componente se monta
        refetchOnWindowFocus: true
    });

    console.log({isLoading, isFetching});

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }

    return (
        <div className="container">
            <h2>RQ Places Page</h2>
            <ul>
                {data?.data.map(place => {
                    return <li key={place.id}>{place.city}</li>
                })}
            </ul>
        </div>
    )

};
