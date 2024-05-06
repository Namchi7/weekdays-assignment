import { useEffect, useState, useRef, useCallback } from "react";

import styles from "./styles/jobs.module.css";

import downArrow from "../assets/svg/down-arrow.svg";

import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobsWithOffset } from "../redux/reducers/fetchAllJobs";

function Jobs() {
  const [offset, setOffset] = useState(0);
  const [jobsData, setJobsData] = useState([]);

  const dispatch = useDispatch();

  const allJobsData = useSelector((state) => state.jobsData.data) || [];
  const loading = useSelector((state) => state.jobsData.isLoading);

  // Setting an observer ref for the last job card
  const observer = useRef();

  // Check if reached the last job card
  const lastJobRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setOffset((prev) => prev + 9);
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // State values for all filters
  const [role, setRole] = useState("");
  const [noEmp, setNoEmp] = useState("");
  const [exp, setExp] = useState("");
  const [locType, setLocType] = useState("");
  const [minSal, setMinSal] = useState();
  const [companyName, setCompanyName] = useState("");

  const handleRoleDropdown = () => {
    const roleFilter = document.querySelector("[data-role-filter]");

    if (roleFilter.style.display === "none") {
      roleFilter.style.display = "block";
    } else {
      roleFilter.style.display = "none";
    }
  };
  const handleNoEmpDropdown = () => {
    const roleFilter = document.querySelector("[data-no-emp-filter]");

    if (roleFilter.style.display === "none") {
      roleFilter.style.display = "block";
    } else {
      roleFilter.style.display = "none";
    }
  };
  const handleExpDropdown = () => {
    const roleFilter = document.querySelector("[data-exp-filter]");

    if (roleFilter.style.display === "none") {
      roleFilter.style.display = "block";
    } else {
      roleFilter.style.display = "none";
    }
  };
  const handleLocTypeDropdown = () => {
    const roleFilter = document.querySelector("[data-loc-type-filter]");

    if (roleFilter.style.display === "none") {
      roleFilter.style.display = "block";
    } else {
      roleFilter.style.display = "none";
    }
  };
  const handleMinSalDropdown = () => {
    const roleFilter = document.querySelector("[data-min-sal-filter]");

    if (roleFilter.style.display === "none") {
      roleFilter.style.display = "block";
    } else {
      roleFilter.style.display = "none";
    }
  };

  const filterJobs = () => {
    let jobs = allJobsData;

    if (role !== "") {
      jobs = jobs.filter((job) => job.jobRole === role.toLowerCase());
    }
    if (exp !== "") {
      jobs = jobs.filter((job) => {
        if (exp === "14+") {
          if (job.min > 14) return job;
        } else {
          const range = exp.split(" - ");
          const [min, max] = range;

          if (
            job.minExp >= parseInt(min) &&
            job.minExp <= parseInt(max) &&
            job.maxExp <= parseInt(max) &&
            job.maxExp >= parseInt(min)
          ) {
            return job;
          }
        }
      });
    }
    if (locType !== "") {
      jobs = jobs.filter((job) => job.location === locType.toLowerCase());
    }
    if (minSal !== undefined) {
      jobs = jobs.filter(
        (job) => (job.minJdSalary ? job.minJdSalary : 0) >= parseInt(minSal)
      );
    }
    if (companyName !== "") {
      jobs = jobs.filter((job) =>
        job.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    setJobsData(jobs);
  };

  const fetchAllJobs = () => {
    dispatch(fetchAllJobsWithOffset(offset));
  };

  useEffect(() => {
    fetchAllJobs();
    filterJobs();
  }, [offset]);

  useEffect(() => {
    filterJobs();
  }, [role, exp, locType, minSal, companyName, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.filtersDiv}>
        <div style={{ width: "120px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Roles"
            value={role}
            readOnly
            className={styles.filterInput}
          />

          <hr className={styles.hrInFilter} />

          <div
            onClick={() => handleRoleDropdown()}
            className={styles.downArrowDiv}
          >
            <img src={downArrow} className={styles.downArrowIcon} />
          </div>

          <div
            style={{ display: "none" }}
            data-role-filter
            className={styles.options}
          >
            <li
              onClick={() => {
                setRole("");
                handleRoleDropdown();
              }}
            >
              Any
            </li>
            <li
              onClick={() => {
                setRole("frontend");
                handleRoleDropdown();
              }}
            >
              Frontend
            </li>
            <li
              onClick={() => {
                setRole("backend");
                handleRoleDropdown();
              }}
            >
              Backend
            </li>
            <li
              onClick={() => {
                setRole("ios");
                handleRoleDropdown();
              }}
            >
              IOS
            </li>
            <li
              onClick={() => {
                setRole("android");
                handleRoleDropdown();
              }}
            >
              Android
            </li>
            <li
              onClick={() => {
                setRole("tech lead");
                handleRoleDropdown();
              }}
            >
              Tech Lead
            </li>
          </div>
        </div>

        <div style={{ width: "175px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Number of Employees"
            value={noEmp}
            readOnly
            className={styles.filterInput}
          />

          <hr className={styles.hrInFilter} />

          <div
            onClick={() => handleNoEmpDropdown()}
            className={styles.downArrowDiv}
          >
            <img src={downArrow} className={styles.downArrowIcon} />
          </div>

          <div
            style={{ display: "none" }}
            data-no-emp-filter
            className={styles.options}
          >
            <li
              onClick={() => {
                setNoEmp("");
                handleNoEmpDropdown();
              }}
            >
              Any
            </li>
            <li
              onClick={() => {
                setNoEmp("0 - 10");
                handleNoEmpDropdown();
              }}
            >
              0 - 10
            </li>
            <li
              onClick={() => {
                setNoEmp("11 - 50");
                handleNoEmpDropdown();
              }}
            >
              11 - 50
            </li>
            <li
              onClick={() => {
                setNoEmp("51 - 200");
                handleNoEmpDropdown();
              }}
            >
              51 - 200
            </li>
            <li
              onClick={() => {
                setNoEmp("201 - 1000");
                handleNoEmpDropdown();
              }}
            >
              201 - 1000
            </li>
            <li
              onClick={() => {
                setNoEmp("1000+");
                handleNoEmpDropdown();
              }}
            >
              1000+
            </li>
          </div>
        </div>

        <div style={{ width: "120px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Experience"
            value={exp}
            readOnly
            className={styles.filterInput}
          />

          <hr className={styles.hrInFilter} />

          <div
            onClick={() => handleExpDropdown()}
            className={styles.downArrowDiv}
          >
            <img src={downArrow} className={styles.downArrowIcon} />
          </div>

          <div
            style={{ display: "none" }}
            data-exp-filter
            className={styles.options}
          >
            <li
              onClick={() => {
                setExp("");
                handleExpDropdown();
              }}
            >
              Any
            </li>
            <li
              onClick={() => {
                setExp("0 - 1");
                handleExpDropdown();
              }}
            >
              0 - 1
            </li>
            <li
              onClick={() => {
                setExp("2 - 4");
                handleExpDropdown();
              }}
            >
              2 - 4
            </li>
            <li
              onClick={() => {
                setExp("5 - 8");
                handleExpDropdown();
              }}
            >
              5 - 8
            </li>
            <li
              onClick={() => {
                setExp("9 - 14");
                handleExpDropdown();
              }}
            >
              9 - 14
            </li>
            <li
              onClick={() => {
                setExp("14+");
                handleExpDropdown();
              }}
            >
              14+
            </li>
          </div>
        </div>

        <div style={{ width: "120px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Remote"
            value={locType}
            readOnly
            className={styles.filterInput}
          />

          <hr className={styles.hrInFilter} />

          <div
            onClick={() => handleLocTypeDropdown()}
            className={styles.downArrowDiv}
          >
            <img src={downArrow} className={styles.downArrowIcon} />
          </div>

          <div
            style={{ display: "none" }}
            data-loc-type-filter
            className={styles.options}
          >
            <li
              onClick={() => {
                setLocType("");
                handleLocTypeDropdown();
              }}
            >
              Any
            </li>
            <li
              onClick={() => {
                setLocType("remote");
                handleLocTypeDropdown();
              }}
            >
              Remote
            </li>
            <li
              onClick={() => {
                setLocType("hybrid");
                handleLocTypeDropdown();
              }}
            >
              Hybrid
            </li>
            <li
              onClick={() => {
                setLocType("delhi ncr");
                handleLocTypeDropdown();
              }}
            >
              Delhi NCR
            </li>
            <li
              onClick={() => {
                setLocType("mumbai");
                handleLocTypeDropdown();
              }}
            >
              Mumbai
            </li>
            <li
              onClick={() => {
                setLocType("bangalore");
                handleLocTypeDropdown();
              }}
            >
              Bangalore
            </li>
            <li
              onClick={() => {
                setLocType("chennai");
                handleLocTypeDropdown();
              }}
            >
              Chennai
            </li>
          </div>
        </div>

        <div style={{ width: "200px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Minimum Base Pay Salary"
            value={minSal}
            readOnly
            className={styles.filterInput}
          />

          <hr className={styles.hrInFilter} />

          <div
            onClick={() => handleMinSalDropdown()}
            className={styles.downArrowDiv}
          >
            <img src={downArrow} className={styles.downArrowIcon} />
          </div>

          <div
            style={{ display: "none" }}
            data-min-sal-filter
            className={styles.options}
          >
            <li
              onClick={() => {
                setMinSal("");
                handleMinSalDropdown();
              }}
            >
              Any
            </li>
            <li
              onClick={() => {
                setMinSal(3);
                handleMinSalDropdown();
              }}
            >
              3
            </li>
            <li
              onClick={() => {
                setMinSal(5);
                handleMinSalDropdown();
              }}
            >
              5
            </li>
            <li
              onClick={() => {
                setMinSal(7);
                handleMinSalDropdown();
              }}
            >
              7
            </li>
            <li
              onClick={() => {
                setMinSal(10);
                handleMinSalDropdown();
              }}
            >
              10
            </li>
            <li
              onClick={() => {
                setMinSal(15);
                handleMinSalDropdown();
              }}
            >
              15
            </li>
            <li
              onClick={() => {
                setMinSal(20);
                handleMinSalDropdown();
              }}
            >
              20
            </li>
          </div>
        </div>

        <div style={{ width: "160px" }} className={styles.filter}>
          <input
            type="text"
            placeholder="Search Company Name"
            value={companyName}
            data-company-name
            onChange={(e) => setCompanyName(e.target.value)}
            className={styles.filterCompanyInput}
          />
        </div>
      </div>

      <div className={styles.filteredJobs}>
        {jobsData &&
          jobsData.map((job, index) => {
            if (jobsData.length === index + 1) {
              return (
                <div ref={lastJobRef} className={styles.jobDiv} key={index}>
                  <JobCard jobData={job} />
                </div>
              );
            } else {
              return (
                <div className={styles.jobDiv} key={index}>
                  <JobCard jobData={job} />
                </div>
              );
            }
          })}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default Jobs;
