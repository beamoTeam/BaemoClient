import React, { useRef } from "react";
import styled from "styled-components";
import { range } from "../../utils/range";
import { digitFormatter } from "../../utils/format";

function TimeBox({ setUserSelect }) {
  const TODAY = new Date();
  const formattedDate = TODAY.toISOString().substring(0, 10);
  let hour = useRef('');
  let minute = useRef('');
  
  const onChange = (e) => {
    let date = ''
    const { name, value } = e.target;
    if (name === 'hour') {
      hour.current = value
      date = `${formattedDate} ${value}:${minute.current}`;
    } else if (name === 'minute') {
      minute.current = value;
      date = `${formattedDate} ${hour.current}:${value}`;
    }
    setUserSelect((prev) => ({
      ...prev,
      orderTime: date,
    }));
  };

  return (
    <StWrap>
      <StHeading>마감시간</StHeading>
      <StSelectBox name="hour" onChange={onChange}>
        <option value="">hh</option>
        {range(TODAY.getHours(), 24).map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </StSelectBox>
      &nbsp;:&nbsp;
      <StSelectBox name="minute" onChange={onChange}>
        <option value="">mm</option>
        {range(0, 55).map((m) => {
          if (m % 5 === 0) {
            return (
              <option key={m} value={digitFormatter(m)}>
                {digitFormatter(m)}
              </option>
            );
          } else {
            return null;
          }
        })}
      </StSelectBox>
    </StWrap>
  );
}

export default TimeBox;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StHeading = styled.p`
  font-weight: 600;
  font-size: 1rem;

  margin: 0.5rem 0;
`;
const StSelectBox = styled.select`
  width: 5rem;
  border: 1px solid #881fc8;
  padding: 0.4rem;
  border-radius: 2px;
  font-weight: 600;
  text-align: center;
  font-size: 0.8rem;
  background-color: white;
  color: black;
`;
