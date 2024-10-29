import { useEffect, useId, useState } from "react";
import arrowimg from "./../assets/images/icon-arrow.svg";
import moment from "moment";

function HomePage() {
  const id = useId();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const handleOnChange = (e) => {
    setInputs((prevItems) => ({
      ...prevItems,
      [e.target.name]: e.target.value,
    }));
  };

  const validateValues = (inputs) => {
    let saveErrors = {};

    if (!inputs.day) {
      saveErrors.day = "This field is required";
    } else if (Number(inputs.day) > 31) {
      saveErrors.day = "Must be a valid day";
    }

    if (!inputs.month) {
      saveErrors.month = "This field is required";
    } else if (Number(inputs.month) > 12) {
      saveErrors.month = "Must be a valid month";
    }

    if (!inputs.year) {
      saveErrors.year = "This field is required";
    } else if (Number(inputs.year) > Number(moment().format("YYYY"))) {
      saveErrors.year = "Must be a valid year";
    }

    return saveErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateValues(inputs);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  };

  const finishSubmit = () => {
    const birthDate = moment(
      `${inputs.year}-${inputs.month}-${inputs.day}`,
      "YYYY-MM-DD"
    );
    const now = moment();

    if (!birthDate.isValid() || birthDate > now) {
      setErrors({ date: "Please enter a valid past date" });
      setSubmitting(false);
      return;
    }

    const years = now.diff(birthDate, "years");
    birthDate.add(years, "years");

    const months = now.diff(birthDate, "months");
    birthDate.add(months, "months");

    const days = now.diff(birthDate, "days");

    setAge({ years, months, days });
    setSubmitting(false);
  };

  useEffect(() => {
    if (submitting) {
      finishSubmit();
    }
  }, [submitting]);

  return (
    <div className="bg-[var(--White)] w-[300px] py-11 px-5 rounded-2xl rounded-br-[90px] h-96 sm:w-[500px] sm:h-[400px] sm:px-8 ">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start font-[simplebold] items-start gap-2 w-full sm:w-[90%] sm:gap-4">
          <div className="flex flex-col gap-1 w-[30%]">
            <label
              className={`text-[var(--Smokey-grey)] text-[11px] tracking-widest ${
                errors.day ? "!text-[var(--Light-red)] " : ""
              }`}
              htmlFor={`day${id}`}
            >
              DAY
            </label>
            <input
              className={`cursor-pointer py-2 px-3 rounded-md border text-[var(--Off-black)] ${
                errors.day ? "border-[var(--Light-red)]" : ""
              }`}
              id={`day${id}`}
              type="number"
              name="day"
              placeholder="DD"
              min={1}
              max={31}
              value={inputs.day}
              onChange={handleOnChange}
            />
            {errors.day && (
              <p className="text-[var(--Light-red)] text-[9px]">{errors.day}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-[30%]">
            <label
              className={`text-[var(--Smokey-grey)] text-[11px] tracking-widest ${
                errors.month ? "!text-[var(--Light-red)] " : ""
              }`}
              htmlFor={`month${id}`}
            >
              MONTH
            </label>
            <input
              className={`cursor-pointer py-2 px-3 rounded-md border text-[var(--Off-black)] ${
                errors.month ? "border-[var(--Light-red)]" : ""
              }`}
              id={`month${id}`}
              type="number"
              name="month"
              placeholder="MM"
              min={1}
              max={12}
              value={inputs.month}
              onChange={handleOnChange}
            />
            {errors.month && (
              <p className="text-[var(--Light-red)] text-[9px]">
                {errors.month}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-[30%]">
            <label
              className={`text-[var(--Smokey-grey)] text-[11px] tracking-widest ${
                errors.year ? "!text-[var(--Light-red)] " : ""
              }`}
              htmlFor={`year${id}`}
            >
              YEAR
            </label>
            <input
              className={`cursor-pointer py-2 px-3 rounded-md border text-[var(--Off-black)] ${
                errors.year ? "border-[var(--Light-red)]" : ""
              }`}
              id={`year${id}`}
              type="number"
              name="year"
              placeholder="YYYY"
              min={1}
              max={moment().format("YYYY")}
              value={inputs.year}
              onChange={handleOnChange}
            />
            {errors.year && (
              <p className="text-[var(--Light-red)] text-[9px]">
                {errors.year}
              </p>
            )}
          </div>
        </div>
        <div className="my-10 relative sm:my-6">
          <hr />
          <button className="bg-[var(--Purple)] cursor-pointer w-12 h-12 flex justify-center items-center rounded-full absolute left-[105px] -top-6 hover:bg-[var(--Off-black)] transition-all duration-300 sm:left-[89%]">
            <img src={arrowimg} className="w-5 h-5" alt="" />
          </button>
        </div>
      </form>
      <div className="text-5xl font-[extrabolditalic] sm:text-6xl">
        <p>
          <span className="text-[var(--Purple)]">{age.years}</span> years
        </p>
        <p>
          <span className="text-[var(--Purple)]">{age.months}</span> months
        </p>
        <p>
          <span className="text-[var(--Purple)]">{age.days}</span> days
        </p>
      </div>
    </div>
  );
}

export default HomePage;
