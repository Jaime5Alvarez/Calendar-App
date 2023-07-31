import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import "./index.css";
import { MyModal } from "./components/MyModal";

import { addDays } from "@fullcalendar/core/internal";
import { EventClickArg, EventDropArg } from "@fullcalendar/core/index.js";
interface EventModalProps {
  eventModal: boolean;
  setEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  EventClickedState: any;
  setEventClickedState: React.Dispatch<React.SetStateAction<any>>;
  HandleSubmitEventUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  HandleDeleteEvent: (e: string) => void;
}
interface Notes {
  id: string;
  type: string;
  title: string;
  start: string;
  end: string;
}
interface Workout {
  id: string;
  type: string;
  title: string;
  date: string;
}

const checkDate = (eventDate: any, rangeStart: any, rangeEnd: any) => {
  if (eventDate >= rangeStart && eventDate < rangeEnd) {
    return true;
  }
};
function App() {
  const calendarRef = useRef<any>();
  const [SelectedEventInfo, setSelectedEventInfo] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [eventModal, setEventModal] = useState<boolean>(false);
  const [dateSelect, setdateSelect] = useState("");
  const [dateSelect2, setdateSelect2] = useState({
    StartDate: "",
    EndDate: "",
  });
  const [EventClickedState, setEventClickedState] = useState<
    Notes | Workout | any
  >();
  const [inputWorkout, setinputWorkout] = useState("");
  const [inputNote, setinputNote] = useState("");
  const [MyEvents, setMyEvents] = useState([
    {
      id: "d1",
      type: "Note",
      title: "BULKING BLOCK",
      start: new Date().toISOString().split("T")[0],
      end: addDays(new Date(), 5).toISOString().split("T")[0],
    },
    {
      id: "d2",
      type: "Workout",
      title: "Workout 1",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "d33",
      type: "Workout",
      title: "Workout 2",
      date: addDays(new Date(), 9).toISOString().split("T")[0],
    },
    {
      id: "d55",
      type: "Workout",
      title: "Workout 3",
      date: addDays(new Date(), 2).toISOString().split("T")[0],
    },
    {
      id: "d666",
      type: "Workout",
      title: "Workout 4",
      date: addDays(new Date(), 6).toISOString().split("T")[0],
    },
  ]);
  const DeleteWorkout = () => {
    if (SelectedEventInfo.length > 0) {
      SelectedEventInfo.map((event: any) => {
        if (event.type == "Workout") {
          setMyEvents((prevEvents) =>
            prevEvents.filter((ev) => ev.id != event.id)
          );
          setSelectedEventInfo([]);
        }
      });
    }
  };
  const HandleSubmitEventUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (EventClickedState) {
      setMyEvents((prevEvents) => {
        return prevEvents.map((event) => {
          if (event.id === EventClickedState.id) {
            return {
              ...event,
              title: EventClickedState.title,
              ...(EventClickedState.type === "Workout"
                ? { date: EventClickedState.date }
                : {
                    start: EventClickedState.start,
                    end: EventClickedState.end,
                  }),
            };
          } else {
            return event;
          }
        });
      });
    }

    setEventModal(false);
  };
  const handleEventDrop = (info: EventDropArg) => {
    const eventId = info.event.id;
    const updatedEvents: any = MyEvents.map((event) => {
      if (event.id === eventId) {
        if (event.type === "Note") {
          const start = info.event.startStr;
          const end = info.event.endStr || info.event.startStr;
          return { ...event, start, end };
        } else if (event.type === "Workout") {
          return { ...event, date: info.event.startStr };
        }
      }
      return event;
    });
    setMyEvents(updatedEvents);
  };
  const handleEventResize = (info: EventResizeDoneArg) => {
    const eventId = info.event.id;
    const updatedEvents: any = MyEvents.map((event) => {
      if (event.id === eventId) {
        if (event.type === "Note") {
          const start = info.event.startStr;
          const end = info.event.endStr || info.event.startStr;
          return { ...event, start, end };
        }
      }
      return event;
    });
    setMyEvents(updatedEvents);
  };
  const handleSelect = (info: any) => {
    setSelectedEventInfo([]);
    setdateSelect(info.startStr);
    const fecha = new Date(info.startStr);
    const newfecha = addDays(fecha, 1);
    // se suma un día
    // muestra la fecha actualizada
    console.log(newfecha);
    setdateSelect2({
      StartDate: info.startStr,
      EndDate: "",
    });
    MyEvents.map((event) => {
      if (event.type == "Workout") {
        checkDate(event.date, info.startStr, info.endStr) &&
          setSelectedEventInfo((prevEvent: any) => [...prevEvent, event]);

        // setMyEvents((prevEvents) =>
        //   prevEvents.filter((ev) => ev.id != event.id)
        // );
      }
    });
    // alert(arg.dateStr);
  };
  // const handleUnSelect = () => {
  //   setTimeout(() => {
  //     console.log("unselect");
  //     setSelectedEventInfo([]);
  //   }, 10); // Espera 100 ms antes de limpiar la selección
  // };
  const handleEventClick = (info: EventClickArg) => {
    setEventModal(true);
    const Eventclicked = MyEvents.filter((ev) => ev.id == info.event.id);
    setEventClickedState(Eventclicked[0]);
  };
  const renderEventContent = (eventInfo: any) => {
    const event = eventInfo.event;
    const color = event.extendedProps.type === "Note" ? "#9DB2BF" : "#526D82";

    return (
      <div
        style={{
          backgroundColor: color,
          color: "white",
          borderRadius: "3px",
          padding: "5px",
        }}
      >
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };
  // const handleEvents = (events: any) => {
  //   console.log(events);
  // };
  const toggleModal = () => {
    setinputWorkout("");
    setModal(!modal);
  };
  const HandleDeleteEvent = (id: string) => {
    const FilteredEvents = MyEvents.filter((ev) => ev.id != id);
    setMyEvents(FilteredEvents);
    setEventModal(false);
  };

  return (
    <>
      <EventModal
        eventModal={eventModal}
        setEventModal={setEventModal}
        EventClickedState={EventClickedState}
        setEventClickedState={setEventClickedState}
        HandleSubmitEventUpdate={HandleSubmitEventUpdate}
        HandleDeleteEvent={HandleDeleteEvent}
      />
      <MyModal
        modal={modal}
        setModal={setModal}
        dateSelect={dateSelect}
        setdateSelect={setdateSelect}
        inputWorkout={inputWorkout}
        setinputWorkout={setinputWorkout}
        setMyEvents={setMyEvents}
        setSelectedEventInfo={setSelectedEventInfo}
        dateSelect2={dateSelect2}
        setdateSelect2={setdateSelect2}
        inputNote={inputNote}
        setinputNote={setinputNote}
      />
      <div className="font-sans relative  bg-white-100 p-5 rounded-lg  ">
        <div className="flex justify-start mb-2">
          <button
            onClick={DeleteWorkout}
            className={` bg-[#526d82df] rounded-lg px-3 ease-in-out text-white duration-200 py-1 ${
              SelectedEventInfo.length == 0 && "opacity-60  cursor-not-allowed"
            } `}
          >
            Delete workout
          </button>
        </div>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={MyEvents}
          eventContent={renderEventContent}
          selectable={true}
          eventClick={(info) => {
            handleEventClick(info);
          }}
          height={"auto"}
          droppable={true}
          select={handleSelect}
          eventResize={(info) => handleEventResize(info)}
          unselectAuto={true}
          unselect={() => setTimeout(() => setSelectedEventInfo(""), 10)}
          dateClick={toggleModal}
          editable={true}
          selectMirror={true}
          eventDrop={(info) => handleEventDrop(info)}
          // eventsSet={handleEvents}
          headerToolbar={{
            start: "title", // will normally be on the left. if RTL, will be on the right

            end: "today prev,next", // will normally be on the right. if RTL, will be on the left
          }}

          // called after events are initialized/added/changed/removed
          //     /* you can update a remote database when these fire:
          //     eventAdd={function(){}}
          //     eventChange={function(){}}
          //     eventRemove={function(){}}
          //     */
        />
      </div>
    </>
  );
}

export const EventModal: React.FC<EventModalProps> = ({
  eventModal,
  setEventModal,
  EventClickedState,
  setEventClickedState,
  HandleSubmitEventUpdate,
  HandleDeleteEvent,
}) => {
  const isWorkout = EventClickedState?.type === "Workout";

  return (
    <>
      {eventModal && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="fixed flex justify-center items-center
      
      top-0 left-50 z-50 bg-black bg-opacity-60  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl  max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <button
                onClick={() => {
                  setEventModal(!eventModal);
                }}
                type="button"
                className="absolute  right-2 top-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex flex-col gap-4 p-4  dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Modify Event
                </h3>
                <form
                  className="mb-6 "
                  onSubmit={(e) => HandleSubmitEventUpdate(e)}
                >
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Update {isWorkout ? "workout" : "note"}
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="bg-gray-50 border mb-4  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={
                      EventClickedState.type == "Workout"
                        ? "Example: Push Workout"
                        : "Example: Bulking"
                    }
                    value={EventClickedState.title}
                    onChange={(e) =>
                      setEventClickedState({
                        ...EventClickedState,
                        title: e.target.value,
                      })
                    }
                    required
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Update date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Date"
                    value={
                      EventClickedState.type == "Workout"
                        ? EventClickedState.date
                        : EventClickedState.start
                    }
                    onChange={(e) =>
                      EventClickedState.type == "Workout"
                        ? setEventClickedState({
                            ...EventClickedState,
                            date: e.target.value,
                          })
                        : setEventClickedState({
                            ...EventClickedState,
                            start: e.target.value,
                          })
                    }
                    required
                  />
                  {EventClickedState.type == "Note" && (
                    <input
                      type="date"
                      name="date"
                      className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example: Bulking block"
                      value={EventClickedState.end}
                      onChange={(e) =>
                        setEventClickedState({
                          ...(EventClickedState as Notes),
                          end: e.target.value,
                        })
                      }
                      required
                    />
                  )}
                  <div className="flex justify-between">
                    <button
                      className="text-white bg-[#526D82] mt-6 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => HandleDeleteEvent(EventClickedState.id)}
                      className="text-white bg-red-700 mt-6 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
              {/* <!-- Modal body --> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default App;
