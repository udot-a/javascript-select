import {Select} from "./select/select";
import "./select/styles.scss";

const select = new Select("#select", {
  placeholder: "Выберите пожалуйста элемент...",
  selectedId: 5,
  data: [
    {id: "1", value: "React"},
    {id: "2", value: "Angular"},
    {id: "3", value: "Vue"},
    {id: "4", value: "JavaScript"},
    {id: "5", value: "Next"},
    {id: "6", value: "Bootstrap"},
  ],
  onSelect(item) {console.log("Selected item: ", item)}
});

window.s = select;
