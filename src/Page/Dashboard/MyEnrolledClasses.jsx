import { Helmet } from "react-helmet-async";
import useEnrollmentClass from "../../hooks/useEnrollmentClass";

const MyEnrolledClasses = () => {
  const [enrooledClass] = useEnrollmentClass();

  return (
    <>
      <Helmet>
        <title>HealthyFit | My Enrolled Class</title>
      </Helmet>
      <div>
        <h2 className="text-2xl mt-5 font-bold mb-4 text-center">
          Enrolled Classes
        </h2>
        {enrooledClass.length === 0 ? (
          <p>No enrolled classes</p>
        ) : (
          <table className="table shadow-2xl w-[1000px] mx-auto">
            <thead className="text-xl">
              <tr>
                <th className="px-4 py-2">Class Photo</th>
                <th className="px-4 py-2">Instructor Image</th>
                <th className="px-4 py-2">Class Name</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {enrooledClass.map((classItem) => (
                <tr key={classItem?._id}>
                  <td className="px-4 py-2">
                    <img className="w-16" src={classItem?.classImage} alt="" />
                  </td>
                  <td className="px-4 py-2">
                    <img
                      className="w-16"
                      src={classItem?.instructorImage}
                      alt=""
                    />
                  </td>
                  <td className="px-4 py-2">{classItem?.className}</td>
                  <td className="px-4 py-2">{classItem?.instructorName}</td>
                  <td className="px-4 py-2">$ {classItem?.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyEnrolledClasses;
