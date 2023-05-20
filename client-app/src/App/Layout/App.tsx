import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../Models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<
        Activity | undefined
    >(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios
            .get<Activity[]>("http://localhost:5000/api/activities")
            .then((res) => {
                const { data } = res;
                setActivities(data);
            });
    }, []);

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find((x) => x.id === id));
    }

    function handleCancleActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancleActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        activity.id
            ? setActivities([
                  ...activities.filter((x) => x.id !== activity.id),
                  activity,
              ])
            : setActivities([...activities, { ...activity, id: uuid() }]);

        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter((x) => x.id !== id)]);
    }

    return (
        <>
            <Navbar openForm={handleFormOpen} />
            <Container style={{ marginTop: "7em" }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    handleSelectActivity={handleSelectActivity}
                    handleCancleActivity={handleCancleActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </>
    );
}

export default App;
