// src/utils/jobDraftId.js
export const generateJobDraftId = (prefix = 'NUMBER') => {
    const now = new Date()
    const year = String(now.getFullYear()).slice(-2)      // YY
    const month = String(now.getMonth() + 1).padStart(2, '0') // MM

    // ใช้ time millis เป็น running number ชั่วคราวฝั่ง client
    const runningNumber = String(now.getTime()).slice(-4) // XXXX

    return `${prefix}-${year}${month}-${runningNumber}`
}