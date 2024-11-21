import Cookies from 'js-cookie'

export const getSessionId = () => {
    const sessionId = Cookies.get('sessionid');
    console.log('Session ID:', sessionId);
    const localSessionId = sessionStorage.getItem('sessionId');
    return localSessionId;
    // return sessionId ? sessionId.replace(/"/g, '') : localSessionId;
}

export const setSession = (sessionId) => {
    Cookies.set('sessionid', sessionId.replace(/"/g, ''), { expires: 1 });
    sessionStorage.setItem('sessionId', sessionId.replace(/"/g, ''));
}

export const setExamSession = (sessionId) => {
    Cookies.set('examSessionId', sessionId.replace(/"/g, ''), { expires: 1 });
    sessionStorage.setItem('examSessionId', sessionId.replace(/"/g, ''));
}


export const getExamProcessedData = (exam) => {
    const { examId, startTime, endTime, duration } = exam;

    // Parse the exam date and time
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const today = new Date();

    // Format the exam date
    const examDate = startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Format the exam time
    const examTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    // Format the exam time
    const examEndTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    // Calculate days left until exam end
    const daysLeft = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));

    // Calculate when the exam ends
    let dayscountDown;
    if (daysLeft === 0) {
        dayscountDown = `${Math.floor((endDate - today) / (1000 * 60 * 60))} hours`;
    } else if (daysLeft === 1) {
        dayscountDown = `1 day`;
    } else if (daysLeft < 0) {
        dayscountDown = `Completed`;
    } else {
        dayscountDown = `${daysLeft} day`;
    }

    // Calculate when the exam starts
    const startInDays = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
    let startIn;
    if (startInDays === 0) {
        if (dayscountDown === 'Completed') {
            startIn = 'Exam Ended';
        }
        startIn = 'today';
    } else if (startInDays === 1) {
        startIn = '1 day';
    } else if (startInDays < 0) {
        startIn = 'Completed';
    } else {
        startIn = `${startInDays} days`;
    }

    // Format the duration
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedDuration = `${hours} hour${hours !== 1 ? 's' : ''}${minutes ? ` ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;

    const examData = {
        ...exam,
        duration: formattedDuration,
        examDate: examDate,
        examTime: `${examTime} - ${examEndTime}`,
        daysLeft: dayscountDown,
        startIn: startIn
    }

    console.log(examData);

    // Output object
    return examData;
}