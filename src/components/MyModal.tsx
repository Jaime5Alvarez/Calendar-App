/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
export const MyModal = ({
  modal,
  setModal,
  dateSelect,
  setdateSelect,
  setinputWorkout,
  inputWorkout,
  setMyEvents,
  setSelectedEventInfo,
  dateSelect2,
  setdateSelect2,
  inputNote,
  setinputNote,
}: any) => {
  const HandleCreateWorkout = (e: any) => {
    e.preventDefault();
    setMyEvents((prevEvents: any) => [
      ...prevEvents,
      {
        id: uuidv4(),
        type: "Workout",
        title: inputWorkout,
        date: dateSelect,
      },
    ]);
    setModal(false);
    setSelectedEventInfo([]);
  };
  const HandleCreateNote = (e: any) => {
    e.preventDefault();
    setMyEvents((prevEvents: any) => [
      ...prevEvents,
      {
        id: uuidv4(),
        type: "Note",
        title: inputNote,
        start: dateSelect2.StartDate,
        end: dateSelect2.EndDate,
      },
    ]);
    setModal(false);
    setSelectedEventInfo([]);
  };
  //   const HandleCreateNote = (e:any) => {
  //     e.preventDefault();
  //   }
  return (
    <>
      {modal && (
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
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  New task
                </h3>
                <button
                  onClick={() => {
                    setModal(!modal);
                    setSelectedEventInfo([]);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </div>
              {/* <!-- Modal body --> */}

              <Create_Workout
                HandleCreateWorkout={HandleCreateWorkout}
                setinputWorkout={setinputWorkout}
                inputWorkout={inputWorkout}
                setdateSelect={setdateSelect}
                dateSelect={dateSelect}
              />
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <Create_Note
                HandleCreateNote={HandleCreateNote}
                dateSelect2={dateSelect2}
                setdateSelect2={setdateSelect2}
                inputNote={inputNote}
                setinputNote={setinputNote}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const Create_Note = ({
  HandleCreateNote,
  dateSelect2,
  setdateSelect2,
  inputNote,
  setinputNote,
}: any) => {
  return (
    <div className="p-6 space-y-6">
      <form onSubmit={(e) => HandleCreateNote(e)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Create note
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example: Bulking block"
            value={inputNote}
            onChange={(e) => setinputNote(e.target.value)}
            required
          />
        </div>
        <div className="relative w-full  ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <div className="flex justify-around w-full gap-5 ">
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
              value={dateSelect2.StartDate}
              onChange={(e) => {
                setdateSelect2((prev: any) => ({
                  ...prev,
                  StartDate: e.target.value,
                }));
              }}
              required
            />
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
              value={dateSelect2.EndDate}
              onChange={(e) => {
                setdateSelect2((prev: any) => ({
                  ...prev,
                  EndDate: e.target.value,
                }));
              }}
              required
            />
          </div>
        </div>
        <div className="flex items-center px-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
          <button
            data-modal-hide="defaultModal"
            type="submit"
            className="text-white bg-[#526D82] mt-6 hover:opacity-90  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create note
          </button>
        </div>
      </form>
    </div>
  );
};
const Create_Workout = ({
  dateSelect,
  setdateSelect,
  setinputWorkout,
  inputWorkout,
  HandleCreateWorkout,
}: any) => {
  return (
    <div className="p-6 space-y-6">
      <form onSubmit={(e) => HandleCreateWorkout(e)}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Create workout
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example: Push workout"
            value={inputWorkout}
            onChange={(e) => setinputWorkout(e.target.value)}
            required
          />
        </div>
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            value={dateSelect}
            onChange={(e) => {
              setdateSelect(e.target.value);
            }}
            required
          />
        </div>
        <div className="flex items-center px-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
          <button
            data-modal-hide="defaultModal"
            type="submit"
            className="text-white bg-[#526D82] mt-6 hover:opacity-90  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create workout
          </button>
        </div>
      </form>
    </div>
  );
};
