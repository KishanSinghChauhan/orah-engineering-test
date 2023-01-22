import React from "react"
import styled from "styled-components"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { useAppSelector } from "shared/hooks/misc"
import { PersonHelper } from "shared/models/person"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { Colors } from "shared/styles/colors"

export const ActivityPage: React.FC = () => {
  const { rolls: activities } = useAppSelector((state) => state.rolls)
  return (
    <S.Container>
      {activities.length
        ? activities.map((_act) => (
            <S.ActivityCard>
              <S.Content>
                <S.Bold>{PersonHelper.getFullName(_act.student)}</S.Bold>
                <p>
                  at: <S.Bold>{PersonHelper.getTime(_act.completed_at)}</S.Bold>
                </p>
              </S.Content>
              <RollStateIcon type={_act.student_roll_states.roll_state} size={40} />
            </S.ActivityCard>
          ))
        : "No Activity Found"}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  ActivityCard: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${Spacing.u3};
    padding: ${Spacing.u3};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Content: styled.div`
    color: ${Colors.dark.base};

    & > p {
      margin: 8px 0 0;
    }
  `,
  Bold: styled.span`
    font-weight: ${FontWeight.strong};
  `,
}
