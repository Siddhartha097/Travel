import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListing";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async() => {

    const currUser = await getCurrentUser();

    if (!currUser) {
        return(
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login to continue!"
            />
        );
    }

    const properties = await getListings({
        userId: currUser.id,
    });

    if (properties.length === 0) {
        return (
            <EmptyState 
                title="No property listings Found"
                subtitle="Seems like you didn't have any property listing to show!"
            />
        )
    }

    return (    
        <PropertiesClient 
            properties={properties}
            currUser={currUser}
        />
    )
}

export default PropertiesPage;