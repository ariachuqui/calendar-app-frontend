import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { NavBar } from "../ui/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "moment/locale/es";
import { messages } from "../../helpers/calendar-messeges-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
    const { events, activeEvent } = useSelector(state => state.calendar);

    const { uid } = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    
    const dispatch = useDispatch();
    
    useEffect(() => {
       
        dispatch( eventStartLoading() );

    }, [dispatch])


    const onDoubleClick = e => {
        dispatch(uiOpenModal());
    };

    const onSelect = e => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() )
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
       
        const style = {
            backgroundColor: (uid === event.user._id) ? "#367CF7" : '#465660',
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
            color: "white",
        };

        return {
            style,
        };
    };

    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                onSelectSlot = {onSelectSlot}
                selectable = {true}
                view={lastView}
                components={{
                    event: CalendarEvent,
                }}
            />
            <AddNewFab />
            {
                (activeEvent) && (<DeleteEventFab />)
            }

            <CalendarModal />
        </div>
    );
};
