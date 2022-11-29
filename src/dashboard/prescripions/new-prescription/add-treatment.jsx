import SubmitButton from "../../components/buttons/submit-button";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";

const AddTreatmentForm = () => {
  return (
    <div
      style={{ backgroundColor: "var(--blue-light)" }}
      className={`rounded-start d-flex flex-column p-2 my-1`}
    >
      <h1 className="flex-fill text-center text-white">العلاج</h1>
      <div className="flex-fill">
        <SelectInput
          name="medicine"
          title="الدواء"
          items={[
            { text: "Ceftriaxone", value: "0" },
            { text: "Congistal", value: "1" },
            { text: "Flagile", value: "2" },
            { text: "Ogmantine", value: "3" },
            { text: "أخرى", value: "" },
          ]}
        />
      </div>
      <div className="flex-fill mt-1">
        <TextInput name="price" placeholder="أضف علاج ليس بالقائمة" />
      </div>
      <div className="flex-fill mt-1">
        <TextareaInput
          placeholder="طريقة الإستعمال"
          name="pastHistoryOfDisease"
        />
      </div>
      <div className="flex-fill mt-1">
        <SubmitButton width={"100%"} color="blue" title="إكتب للروشتة" />
      </div>
    </div>
  );
};

export default AddTreatmentForm;
