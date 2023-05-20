import { Grid } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: Boolean;
    handleSelectActivity: (id: string) => void;
    handleCancleActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

function ActivityDashboard({
    activities,
    selectedActivity,
    handleSelectActivity,
    handleCancleActivity,
    editMode,
    openForm,
    closeForm,
    createOrEdit,
    deleteActivity,
}: Props) {
    return (
        <>
            <Grid>
                <Grid.Column width="10">
                    <ActivityList
                        activities={activities}
                        handleSelectActivity={handleSelectActivity}
                        deleteActivity={deleteActivity}
                    />
                </Grid.Column>
                <Grid.Column width="6">
                    {selectedActivity && !editMode && (
                        <ActivityDetails
                            activity={selectedActivity}
                            handleCancleActivity={handleCancleActivity}
                            openForm={openForm}
                        />
                    )}
                    {editMode && (
                        <ActivityForm
                            closeForm={closeForm}
                            activity={selectedActivity}
                            createOrEdit={createOrEdit}
                        />
                    )}
                </Grid.Column>
            </Grid>
        </>
    );
}

export default ActivityDashboard;
