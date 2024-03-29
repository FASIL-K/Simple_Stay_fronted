<Card>
<Typography color="blue-gray" className="size-16 font-semibold" >
  Premium Plan Sales Report
</Typography>
<table className="min-w-full bg-white border border-gray-300">
  <thead className="bg-indigo-500 text-white">
    <tr>
      <th className="py-2">User Email</th>
      <th className="py-2">Package Name</th>
      <th className="py-2">Price</th>
      <th className="py-2">Exp Date</th>
      <th className="py-2">Details</th>
    </tr>
  </thead>
  <tbody>
    {premiumSalesReport.map((result) => (
      <tr key={result.id} className="border-t">
        <td className="py-3">{result.user_details.email}</td>
        <td className="py-3">{result.package_details.name}</td>
        <td className="py-3">{result.package_details.price}</td>
        <td className="py-3">{result.exp_date}</td>
        <td className="py-3">
          <Button
            color="lightBlue"
            onClick={() => openModal(result)}
            className="size-40 "
          >
            Details
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</Card>

{/* Modal */}
<Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
style={{
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 450,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: 24,
    textAlign: "center",
  },
}}
>
<Card className="p-4">
  <Typography color="blue-gray" variant="h6" className="font-semibold">
    Details
  </Typography>
  {selectedData && (
    <div>
      <p>
        <strong>Start Date:</strong> {selectedData.start_date}
      </p>
      <p>
        <strong>Expire Date:</strong> {selectedData.exp_date}
      </p>
      <p>
        <strong>Active Status:</strong>{" "}
        {selectedData.is_active ? "Active" : "Inactive"}
      </p>

      <Typography color="blue-gray" variant="h6" font-semibold>
        Plan Details
      </Typography>
      <p>
        <strong>Name:</strong> {selectedData.package_details.name}
      </p>
      <p>
        <strong>Price:</strong> {selectedData.package_details.price}
      </p>
      <p>
        <strong>Validity:</strong>{" "}
        {selectedData.package_details.validity}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {selectedData.package_details.description}
      </p>
    </div>
  )}
  <div className="mt-4">
    <Button
      color="lightBlue"
      onClick={closeModal}
      
    >
      Close
    </Button>
  </div>
</Card>
</Modal>