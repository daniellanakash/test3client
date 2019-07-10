import React from 'react';
import axios from 'axios';
import _ from 'lodash';

export default class appointmentInputs extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedTeam: '',
         teams: [],
         date: '',
         content: '',
         time: 0,
      }
   }

   shouldComponentUpdate(nextProps, nextState) {
      return this.state.date !== nextState.date ||
         this.state.content !== nextState.content ||
         this.state.time !== nextState.time ||
         this.state.teams.length !== nextState.teams.length
   }

   onChange(field, value) {
      this.setState({ [field]: value })
   }

   teamChange(field, value) {
      console.log(value);
      this.props.team(value);
      this.setState({ [field]: value })
   }

   addAppointment(prevProps, prevState) {
      const { date, content, time, selectedTeam } = this.state
      this.props.team(selectedTeam)
      axios.put(`http://localhost:4000/appointments`, { date, content, time, selectedTeam }).then(({ data }) => {
         console.log('In!');
         this.props.updated(selectedTeam)
      }).catch(err => console.log(err));
   }

   render() {
      return (
         <div className="input-group mb-3">
            <div className=" col-sm-5" style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
               <div className="team col-sm-5">
                  <p>
                     Make a new appointment for:<br />
                     <select onChange={({ target }) => this.teamChange('selectedTeam', target.value)}>
                        <option selected={true} disabled>Choose Team</option>
                        {_.map(this.state.teams, (x, idx) => <option key={idx}>{x.team}</option>)}
                     </select>
                  </p>
               </div>
               <div className="inputs col-sm-5">
                  <p>
                     <input type="text" placeholder="Meeting Content" onChange={({ target }) => this.onChange('content', target.value)} />
                     <input type="date" placeholder="Date" onChange={({ target }) => this.onChange('date', target.value)} />
                     <input type="number" placeholder="Duration" max="10" min="0" step="0.5" onChange={({ target }) => this.onChange('time', target.value)} />
                  </p>
               </div>
               <div className="button col-sm-4">
                  <button type="button" className="btn btn-primary" onClick={() => this.addAppointment()}>Make Appointment</button>
               </div>
            </div>
         </div>
      )
   }
   componentDidMount() {
      axios.get('http://localhost:4000/teams').then(({ data }) => {
         this.setState({ teams: data.teams })
      }).catch(err => console.log(err))
   }
}
