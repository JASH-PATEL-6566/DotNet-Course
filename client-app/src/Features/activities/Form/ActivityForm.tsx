import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../App/Models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

function ActivityForm({
    closeForm,
    activity: selectedActivity,
    createOrEdit,
    submitting,
}: Props) {
    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }
    function handleInputChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <>
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        placeholder="Title"
                        value={activity.title}
                        name="title"
                        onChange={handleInputChange}
                    />
                    <Form.TextArea
                        cplaceholder="Description"
                        name="description"
                        value={activity.description}
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder="Category"
                        name="category"
                        value={activity.category}
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder="Date"
                        type="date"
                        value={activity.date}
                        name="date"
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder="City"
                        value={activity.city}
                        name="city"
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder="Venue"
                        value={activity.venue}
                        name="venue"
                        onChange={handleInputChange}
                    />
                    <Button
                        floated="right"
                        positive
                        type="submit"
                        content="Submit"
                        loading={submitting}
                    />
                    <Button
                        floated="right"
                        color="grey"
                        content="Cancle"
                        onClick={closeForm}
                    />
                </Form>
            </Segment>
        </>
    );
}

export default ActivityForm;
