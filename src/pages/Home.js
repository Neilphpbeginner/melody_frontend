import LeaveRequestDialog from "./LeaveRequestDialog";
import PastLeaveRequests from "./PastLeaveRequests";

const Home = (props) => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    return (
        <div className="home">
            <div className="d-flex justify-content-between align-items-center">
            <h3>Hi, {currentUser?.user?.name}</h3>
            <div className={props?.user?.user?.role === 'admin' ? 'd-none' : 'd-block'}>
                <LeaveRequestDialog/>
            </div>
            </div>
            <div>
                <PastLeaveRequests user={props.user} fetchPastLeaveRequests={props.fetchPastLeaveRequests}/>
            </div>
        </div>
    )
}

export default Home;