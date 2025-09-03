import { useEffect, useMemo, useState } from 'react'
import { useAttendanceContext } from './AttendanceContext';

function useDropDown() {
    const { filterDateData } = useAttendanceContext();
    const [selectStudentID, setSelectStudentID] = useState('Select ID');
    // filter to dropdown the data with student Id 
      const studentIds = useMemo(() => {
        const ids = new Set();
        if (filterDateData && Array.isArray(filterDateData)) {
          filterDateData.forEach((datum) => {
            if (datum && datum.student) {
              Object.keys(datum.student).forEach((id) => ids.add(id));
            }
          });
        }
        return Array.from(ids).sort();
      }, [filterDateData]);
    
      useEffect(() => {
        if (selectStudentID !== 'Select ID' && !studentIds.includes(selectStudentID)) {
          setSelectStudentID('Select ID');
        }
      }, [studentIds, selectStudentID]);
    
  return { studentIds ,selectStudentID, setSelectStudentID }
}

export default useDropDown