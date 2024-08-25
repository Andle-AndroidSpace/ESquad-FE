import React, { useEffect, useState } from 'react';

const AlarmContent = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alarmTime, setAlarmTime] = useState('');
    const [isAlarmActive, setIsAlarmActive] = useState(false);
    const [alarmTriggered, setAlarmTriggered] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isAlarmActive && currentTime.toTimeString().slice(0, 5) === alarmTime) {
            setAlarmTriggered(true);
            setIsAlarmActive(false);
            // You can add sound or notification here
        }
    }, [currentTime, alarmTime, isAlarmActive]);

    const handleSetAlarm = (e) => {
        e.preventDefault();
        setIsAlarmActive(true);
        setAlarmTriggered(false);
    };

    const handleResetAlarm = () => {
        setIsAlarmActive(false);
        setAlarmTriggered(false);
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-md shadow-md w-80 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Alarm Clock</h2>
            
            <div className="mb-4">
                <div className="text-lg mb-2">Current Time:</div>
                <div className="text-3xl font-bold">{currentTime.toTimeString().slice(0, 5)}</div>
            </div>

            <form onSubmit={handleSetAlarm} className="flex flex-col">
                <label className="text-sm mb-2" htmlFor="alarmTime">Set Alarm Time:</label>
                <input
                    id="alarmTime"
                    type="time"
                    value={alarmTime}
                    onChange={(e) => setAlarmTime(e.target.value)}
                    className="mb-4 p-2 bg-gray-700 rounded-md border border-gray-600"
                />
                <button
                    type="submit"
                    className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
                >
                    Set Alarm
                </button>
            </form>

            {isAlarmActive && (
                <div className="mt-4 text-green-400">
                    Alarm is set for {alarmTime}
                </div>
            )}

            {alarmTriggered && (
                <div className="mt-4 text-red-400">
                    ⏰ Alarm Triggered!
                </div>
            )}

            {isAlarmActive && (
                <button
                    onClick={handleResetAlarm}
                    className="mt-4 bg-red-500 p-2 rounded-md text-white hover:bg-red-600 focus:outline-none"
                >
                    Reset Alarm
                </button>
            )}
        </div>
    );
};

export default AlarmContent;