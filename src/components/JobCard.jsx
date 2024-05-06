import PropTypes from "prop-types";

import styles from "./styles/jobs.module.css";

import postedIcon from "../assets/svg/hourglass.svg";
import lightning from "../assets/svg/lightning.svg";
import tick from "../assets/svg/check-tick.svg";
import user1 from "../assets/images/user1.png";
import user2 from "../assets/images/user2.png";
import companyLogo from "../assets/images/company-logo-fallback.png";

function JobCard(props) {
  const jobData = props.jobData;

  return (
    <>
      <div className={styles.postedOn}>
        <img
          src={postedIcon}
          alt=""
          width={12}
          height={12}
          className={styles.postedIcon}
        />
        <p>Posted 10 days ago</p>
      </div>

      <div className={styles.withIcon}>
        <img
          src={jobData.logoUrl}
          onError={(e) => (e.target.src = companyLogo)}
          alt="Company Icon"
          width={56}
          height={56}
        />

        <div className={styles.withIconRight}>
          <p className={styles.companyName}>{jobData.companyName}</p>
          <p style={{ textTransform: "capitalize" }}>{jobData.jobRole}</p>
          <p style={{ textTransform: "capitalize" }}>{jobData.location}</p>
        </div>
      </div>

      <div className={styles.estimatedSalary}>
        {`Estimated Salary: $${
          jobData.minJdSalary ? jobData.minJdSalary : "?"
        }K - ${jobData.maxJdSalary ? jobData.maxJdSalary : "?"}K p.a.`}
        <img src={tick} alt="Verified Salary" height={16} width={16} />
      </div>

      <div className={styles.aboutCompanyDiv}>
        <p>About Company</p>
        <p>About us</p>
        <div className={styles.aboutInfoDiv}>
          <p className={styles.aboutInfo}>{jobData.jobDetailsFromCompany}</p>
          <a
            href={jobData.jdLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewJobBtn}
          >
            View Job
          </a>
        </div>
      </div>

      <div className={styles.minExpDiv}>
        <p>Minimum Experience</p>
        <p>{jobData.minExp ? jobData.minExp : 0} years</p>
      </div>

      <div className={styles.jobActions}>
        <a
          href={jobData.jdLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.easyApplyDiv}
        >
          <img src={lightning} alt="" width={20} height={20} />
          <p>Easy Apply</p>
        </a>
        <div className={styles.referralsDiv}>
          <img src={user1} alt="User 1" width={24} height={24} />
          <img src={user2} alt="User 2" width={24} height={24} />
          <p>Unlock referral asks</p>
        </div>
      </div>
    </>
  );
}

JobCard.propTypes = {
  jobData: PropTypes.object,
};

export default JobCard;
