import * as React from 'react';
import { useState } from 'react';
import styles from './MainPage.module.css';

import RealTime from './1RealTime';
import AllWork from './2AllWork';
import Chatting from './4Chatting';
import MainFrame from './MainFrame';

// import NaverMapApi from '../navermap/NaverMapApi';
import fold_on from '../assets/images/fold_on.png'
import fold_off from '../assets/images/fold_off.png'
import search from '../assets/images/search.png';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, styled, ThemeProvider, } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import { nodeName } from 'jquery';
import { display } from '@mui/system';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';




const theme = createTheme({
  overrides: {
    // Style sheet name
    MuiTouchRipple: {
      // Name of the rule
      child: {
        // Some CSS
        backgroundColor: "red"
      }
    }
  },
  palette: {
    mymaincolor: {
      main: '#0F1839',
    },
  },
  typography: {
    "fontFamily": "BMJUA"
  }
});

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0F1839',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0F1839',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#0F1839',
    },
  },
});

const MainPage = () => {

  const [test_temp, setTestTemp] = useState([])

  const [region, setRegion] = React.useState('');
  const [univ, setUniv] = React.useState('');
  const [taskTime, setTaskTime] = React.useState('');
  let today = new Date(new Date().setDate(new Date().getDate()));
  const [pickDate, pickDateValue] = React.useState(
    today.getMonth() + 1 > 10
      ? (today.getDate() > 10
        ? `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        : `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`)
      : `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`
  );
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const [pickDate2, pickDateValue2] = React.useState(
    yesterday.getMonth() + 1 > 10
      ? (yesterday.getDate() > 10
        ? `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate() - 1}`
        : `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-0${yesterday.getDate() - 1}`)
      : `${yesterday.getFullYear()}-0${yesterday.getMonth() + 1}-0${yesterday.getDate() - 1}`
  );

  const handleChange1 = (event) => {
    setRegion(event.target.value);

  };
  const handleChange2 = (event) => {
    setUniv(event.target.value);
  };
  const handleChange3 = (event) => {
    setTaskTime(event.target.value);
  };

  const [MainId, setactiveId] = useState(0);
  const clickhandler = (Id) => {
    setactiveId(Id);
  }
  const [MenuId, setMenuId] = useState(0);
  const clickhandler2 = (Id) => {
    setMenuId(Id);
  }

  const myParams = {
    region: region,
    univ: univ,
    taskTime: taskTime,
  }
  const myParams1 = {
    ...myParams,
    pickDate: pickDate,
  }
  const myParams2 = {
    ...myParams,
    pickDate: pickDate
  }

  const contents = {
    0: <RealTime myParams={myParams1} />,
    1: <AllWork myParams={myParams2} />,
    2: <Chatting />,
  }
  const menu_header = {
    0: '????????? ?????? ??????',
    1: '?????? ??????',
    2: '??????',
  }
  React.useEffect(() => {
    setRegion('')
    setUniv('')
    setTaskTime('')
    pickDateValue(today.getMonth() + 1 > 10 ? (today.getDate() > 10 ? `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` : `${today.getFullYear()}-${today.getMonth() + 1}-0${today.getDate()}`) : `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`)
    pickDateValue2(yesterday.getMonth() + 1 > 10 ? (yesterday.getDate() > 10 ? `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}` : `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-0${yesterday.getDate()}`) : `${yesterday.getFullYear()}-0${yesterday.getMonth() + 1}-0${yesterday.getDate()}`)
  }, [MainId])

  React.useEffect(() => {
    setUniv('')
  }, [myParams.region])

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <button onClick={fold} className={styles.fold_button}> */}
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          {/* <button className={styles.fold_button}>
            <img src={fold_on} style={{width:"10px", height:"10px"}} alt="" />
          </button> */}
          <MainFrame
            setMainId={clickhandler}
            changeMenuHeader={clickhandler2}
          />
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <div className={styles.menu_header_after} id="menu_header">
            <div>{menu_header[MenuId]}</div>
            {
              MenuId < 2
                ? (
                  MenuId < 1
                    // 0??? ??????, ????????? today
                    ? <div className={styles.menu_setting}>
                      <ThemeProvider theme={theme}>
                        {/* ?????? ?????? */}
                        <FormControl autofocus color="mymaincolor" sx={{ m: 0, minWidth: 120 }} size="small">
                          <InputLabel
                            id="demo-select-small"
                            color="mymaincolor"
                            sx={{
                              fontFamily: "BMJUA",
                              color: "mymaincolor"
                            }}>??????</InputLabel>
                          <Select
                            autoFocus
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={region}
                            label="Age"
                            onChange={handleChange1}
                            sx={{
                              color: "warning",
                            }}
                          >
                            <MenuItem sx={{ fontFamily: "BMJUA" }} value={"SEOUL"}>??????</MenuItem>
                            <MenuItem sx={{ fontFamily: "BMJUA" }} value={"GWANGJU"}>??????</MenuItem>
                          </Select>
                        </FormControl>
                        {/* ?????? ?????? */}
                        {
                          region === "" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} disabled size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {
                          region === "SEOUL" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'???????????????'}>???????????????</MenuItem>
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {
                          region === "GWANGJU" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'???????????????'}>???????????????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'?????????????????????'}>?????????????????????</MenuItem>
                                {/* <MenuItem sx={{ fontFamily: "BMJUA" }} value={'??????'}>??????</MenuItem> */}
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {/* ?????? ?????? */}
                        {
                          univ !== "" ?
                            <FormControl color="mymaincolor" sx={{ marginRight: 2, marginLeft: 2, minWidth: 120, fontFamily: "BMJUA" }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} placeholder="??????" color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={taskTime}
                                label="Age"
                                onChange={handleChange3}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"lunch"}>??????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"dinner"}>??????</MenuItem>
                              </Select>
                            </FormControl>
                            : <FormControl disabled color="mymaincolor" sx={{ marginRight: 2, marginLeft: 2, minWidth: 120, fontFamily: "BMJUA" }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} placeholder="??????" color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={taskTime}
                                label="Age"
                                onChange={handleChange3}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"lunch"}>??????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"dinner"}>??????</MenuItem>
                              </Select>
                            </FormControl>
                        }
                        {/* ?????? ?????? */}
                        {
                          MainId !== 0
                            ? <LocalizationProvider sx={{ fontFamily: "BMJUA" }} color="mymaincolor" dateAdapter={AdapterDayjs}>
                              <DatePicker
                                inputFormat='YYYY??? MM??? DD???'
                                fontFamily="BMJUA"
                                color="mymaincolor"
                                label="??????"
                                value={pickDate}
                                sx={{ fontFamily: "BMJUA" }}
                                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                onChange={(newValue) => {
                                  pickDateValue(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField color="mymaincolor"
                                    size="small"
                                    sx={{ marginRight: 2, marginLeft: 0, width: 200, fontFamily: "BMJUA" }}
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "2022??? 01??? 01???"
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                            : <LocalizationProvider sx={{ fontFamily: "BMJUA" }} color="mymaincolor" dateAdapter={AdapterDayjs}>
                              <MobileDatePicker
                                inputFormat='YYYY??? MM??? DD???'
                                fontFamily="BMJUA"
                                color="mymaincolor"
                                label="??????"
                                disabled={true}
                                value={pickDate}
                                sx={{ fontFamily: "BMJUA" }}
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                  pickDateValue(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField color="mymaincolor"
                                    size="small"
                                    sx={{ marginRight: 2, marginLeft: 0, width: 200, fontFamily: "BMJUA" }}
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "2022??? 01??? 01???"
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                        }
                      </ThemeProvider>
                      {/* <button className={styles.searchBUtton} >
                      <img style={{ width: "25px", height: "25px", marginTop: "2px", marginRight: "10px" }} src={search} alt="" />
                    </button> */}
                    </div>

                    // 1??? ??????, ?????? ?????? yesterday
                    : <div className={styles.menu_setting}>
                      <ThemeProvider theme={theme}>
                        {/* ?????? ?????? */}
                        <FormControl autofocus color="mymaincolor" sx={{ m: 0, minWidth: 120 }} size="small">
                          <InputLabel
                            id="demo-select-small"
                            color="mymaincolor"
                            sx={{
                              fontFamily: "BMJUA",
                              color: "mymaincolor"
                            }}>??????</InputLabel>
                          <Select
                            autoFocus
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={region}
                            label="Age"
                            onChange={handleChange1}
                            sx={{
                              color: "warning",
                            }}
                          >
                            <MenuItem sx={{ fontFamily: "BMJUA" }} value={"SEOUL"}>??????</MenuItem>
                            <MenuItem sx={{ fontFamily: "BMJUA" }} value={"GWANGJU"}>??????</MenuItem>
                          </Select>
                        </FormControl>
                        {/* ?????? ?????? */}
                        {
                          region === "" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} disabled size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {
                          region === "SEOUL" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'???????????????'}>???????????????</MenuItem>
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {
                          region === "GWANGJU" ?
                            <FormControl color="mymaincolor" sx={{ marginLeft: 2, minWidth: 120 }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={univ}
                                label="Age"
                                onChange={handleChange2}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'???????????????'}>???????????????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={'?????????????????????'}>?????????????????????</MenuItem>
                              </Select>
                            </FormControl>
                            :
                            <></>
                        }
                        {/* ?????? ?????? */}
                        {
                          univ !== "" ?
                            <FormControl color="mymaincolor" sx={{ marginRight: 2, marginLeft: 2, minWidth: 120, fontFamily: "BMJUA" }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} placeholder="??????" color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={taskTime}
                                label="Age"
                                onChange={handleChange3}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"lunch"}>??????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"dinner"}>??????</MenuItem>
                              </Select>
                            </FormControl>
                            : <FormControl disabled color="mymaincolor" sx={{ marginRight: 2, marginLeft: 2, minWidth: 120, fontFamily: "BMJUA" }} size="small">
                              <InputLabel sx={{ fontFamily: "BMJUA" }} placeholder="??????" color="mymaincolor" id="demo-select-small">??????</InputLabel>
                              <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={taskTime}
                                label="Age"
                                onChange={handleChange3}
                              >
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"lunch"}>??????</MenuItem>
                                <MenuItem sx={{ fontFamily: "BMJUA" }} value={"dinner"}>??????</MenuItem>
                              </Select>
                            </FormControl>
                        }
                        {/* ?????? ?????? */}
                        {
                          MainId !== 0
                            ? <LocalizationProvider sx={{ fontFamily: "BMJUA" }} color="mymaincolor" dateAdapter={AdapterDayjs}>
                              <DatePicker
                                inputFormat='YYYY??? MM??? DD???'
                                fontFamily="BMJUA"
                                color="mymaincolor"
                                label="??????"
                                value={pickDate}
                                // value={pickDate2}
                                sx={{ fontFamily: "BMJUA" }}
                                maxDate={new Date()}
                                // maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                onChange={(newValue) => {
                                  pickDateValue(newValue);
                                  // pickDateValue2(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField color="mymaincolor"
                                    size="small"
                                    sx={{ marginRight: 2, marginLeft: 0, width: 200, fontFamily: "BMJUA" }}
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "2022??? 01??? 01???"
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                            : <LocalizationProvider sx={{ fontFamily: "BMJUA" }} color="mymaincolor" dateAdapter={AdapterDayjs}>
                              <DatePicker
                                inputFormat='YYYY??? MM??? DD???'
                                fontFamily="BMJUA"
                                color="mymaincolor"
                                label="??????"
                                disabled={true}
                                value={pickDate2}
                                // value={pickDate2}
                                sx={{ fontFamily: "BMJUA" }}
                                maxDate={new Date()}
                                onChange={(newValue) => {
                                  pickDateValue(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField color="mymaincolor"
                                    size="small"
                                    sx={{ marginRight: 2, marginLeft: 0, width: 200, fontFamily: "BMJUA" }}
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "2022??? 01??? 01???"
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                        }
                      </ThemeProvider>
                      {/* <button className={styles.searchBUtton} >
                      <img style={{ width: "25px", height: "25px", marginTop: "2px", marginRight: "10px" }} src={search} alt="" />
                    </button> */}
                    </div>
                )
                : <></>
            }

          </div>
          <div className={styles.menu_content}>{contents[MainId]}</div>
        </div>
      </div>
      {/* <button onClick={() => { setTestTemp([1, 3, 5]) }}>???????????????????????????</button>
      <button onClick={() => { setTestTemp([2, 4, 6]) }}>????????????????????????</button>
      {
        test_temp.map((item, index) => {
          return item === 1 ? <div>??????</div> : <div>??????</div>
        })
      } */}
    </div>
  );
};

export default MainPage;
