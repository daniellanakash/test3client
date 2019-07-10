import React from 'react';
import _ from 'lodash';

export default class myAppointments extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      if (this.props.appointments.length === 0) {
         return null;
      }
      return (
         <div className="col-sm-5 rounded-sm" style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            {_.map(this.props.appointments, (x, idx) =>
               <div style={{ border: '1px solid black', padding: '10px' }} key={idx}>
                  <h4>{x.content}</h4><br />
                  <h5>Date: {x.date.substr(0, 9)}</h5>
                  <h5>Duration: {x.time} Hour/s</h5>
               </div>)}
         </div>
      )
   }
}
