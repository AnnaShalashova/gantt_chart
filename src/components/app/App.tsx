// @ts-ignore
import { Gantt, MaterialTheme } from "@dhtmlx/trial-react-gantt";
import "./App.css";
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addData } from '../../redux/dataSlice';
import { useEffect } from "react";
import {columns, scales} from "../data";
import icon from "../../icons/Vector.svg";

type Task = {
 id: number,
 period_start: string,
 period_end: string,
 title: string,
 sub?: Task[] 
}

let res: Task[] = [];
const transformData = (data: any, parentId?: number): void => {

  const transformObj = (obj: Task): void => {
    let copyObj: Task | {} = {};

    for (let key in obj) {
      if (key === "sub") { 
        transformData(obj[key], obj.id);
      } else if (key === "period_start") {
        copyObj = {...copyObj, start_date: obj[key]};
      } else if (key === "period_end") {
        const date = new Date(obj[key]);
        const endDate = date.setDate(date.getDate() + 1);
        copyObj = {...copyObj, end_date: endDate};
      } else if (key === "title") {
        copyObj = {...copyObj, text: obj[key]};
      } else if (key === "id") {
        copyObj = {...copyObj, id: obj[key]};
      }
    }
    if (parentId) {
      copyObj = {...copyObj, parent: parentId};
    }
      res.push(copyObj as Task);
  }

  if (Array.isArray(data)) {
    for (let task of data) {
      transformObj(task);
    }
  } else {
    transformObj(data)
  }
}

const App = () => {

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.data.tasks);
  const projectPeriod = useAppSelector((state) => state.data.period);
  const projectName = useAppSelector((state) => state.data.project);

  useEffect(() => {
    getTasks().then((data) => {
      dispatch(addData(data)
    )})
  }, [])

  const getTasks = async () => {
    const res = await fetch("http://82.202.204.94/tmp/test.php");
    const data = await res.json();
    return data;
  };

  if (tasks.length > 0) {
    transformData(tasks);
    res.sort((a, b): number => a.id - b.id); 
    
    return (
      <div className="App">
        <div className="header">
          <h4 className="project_name"> {projectName} / {projectPeriod}</h4>
          <div className="btn_container">
            <img src={icon} alt="arrow_save" className="arrow_save"/>
            <button className="btn_save" type="button"> Export</button>
          </div>
        </div>
          <MaterialTheme>
            <Gantt scales={scales} 
              columns={columns} 
              tasks={res} 
              cellHeight={40}
              cellWidth={20}
              scaleHeight={25}
              end={new Date(2025, 1)}/>           
          </MaterialTheme>
       </div>
    );
  }
  return <div>Loading...</div>
}

export default App;
