import React, { Component } from 'react';
import axios from 'axios';
import AppointmentInputs from './components/appointmentInputs.js';
import MyAppointments from './components/myAppointments.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: '',
      appointments: [],
      refresh: false,
      appointmentsUpdated: false
    }
    this.getAppointmentsForTeam = this.getAppointmentsForTeam.bind(this);
  }

  getAppointmentsForTeam(team) {
    axios.get('http://localhost:4000/appointments?team=' + team).then(({ data }) => {
      console.log(team);
      this.setState({ appointments: data.appointments, selectedTeam: team })
    }).catch(err => console.log(err))
  }

  setTeam(team) {
    this.setState({ selectedTeam: team });
    this.getAppointmentsForTeam(team);
  }

  appointmentsUpdated(team) {
    this.getAppointmentsForTeam(team);
  }

  render() {
    return (
      <div>
        <h1>Appointments</h1>
        <AppointmentInputs team={t => this.setTeam(t)} updated={this.getAppointmentsForTeam} />
        <MyAppointments team={this.state.selectedTeam} appointments={this.state.appointments} />
      </div>
    )
  }
}

export default App;
