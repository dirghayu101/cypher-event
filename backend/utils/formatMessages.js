function getCurrentTime() {
    const now = new Date();
    // Get the current time in hours and minutes
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Format the time as HH:MM
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

module.exports.formatMessage = (username, text, css) => {
    return{
        username,
        text, 
        css,
        time: getCurrentTime(),
    }
}