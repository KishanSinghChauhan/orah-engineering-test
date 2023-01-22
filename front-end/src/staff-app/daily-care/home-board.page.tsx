import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { OrderList, Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import Input from "shared/components/input/input.component"
import { Menu, MenuItem, Switch } from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "shared/hooks/misc"
import { filterPersons, filterPersonsByRoll, orderPersons } from "redux/person.slice"

export const HomeBoardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isRollMode, setIsRollMode] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const [getStudents, _, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const { persons, filteredPersons } = useAppSelector((state) => state.person)

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
      dispatch(filterPersonsByRoll("none"))
    }
  }

  const handleSearch = (val: string) => {
    setSearchValue(val)
    dispatch(filterPersons({ value: val }))
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} searchValue={searchValue} handleSearch={handleSearch} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && persons.length > 0 && (
          <>
            {(filteredPersons.length ? filteredPersons : persons).map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  searchValue: string
  handleSearch: (value: string) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const dispatch = useAppDispatch()
  const { onItemClick, searchValue, handleSearch } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <S.ToolbarContainer>
      <S.Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Sort
      </S.Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {OrderList.map((_item) => (
          <MenuItem
            onClick={() => {
              dispatch(orderPersons(_item.value))
              handleClose()
            }}
            key={_item.value}
          >
            {_item.label}
          </MenuItem>
        ))}
      </Menu>
      <Input value={searchValue} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." autoFocus />
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,

  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
