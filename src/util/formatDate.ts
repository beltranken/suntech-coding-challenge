export function formatDate(date?: Date) {
    const today = date || new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; // Months start at 0!
    const dd = today.getDate();

    let ddStr = String(dd);
    let mmStr = String(mm);

    if (dd < 10) ddStr = '0' + dd;
    if (mm < 10) mmStr = '0' + mm;

    return yyyy + '-' + mmStr + '-' + ddStr;
}