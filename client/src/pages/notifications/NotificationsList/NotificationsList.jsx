import { Unstable_Grid2 as Grid } from "@mui/material";
import NotificationListFeature from "@/features/notifications/NotificationsList";
import { NotificationsListContainerStyles } from "./NotificationsList.styles";

/** Renders the notifications management page */
const NotificationsList = () => {
    return (
        <Grid
            container
            sx={NotificationsListContainerStyles}
            justifyContent="center"
        >
            <Grid sm={12} md={7}>
                <NotificationListFeature />
            </Grid>
        </Grid>
    );
};

export default NotificationsList;
