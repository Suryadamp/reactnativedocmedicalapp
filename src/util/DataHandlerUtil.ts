export function labReportTransformedData(originalData: any): any {
  const transformedData = originalData.map((item: any) => {
    const diseaseName = Object.keys(item.tests)[0];
    const testData = item.tests[diseaseName];

    const transformedItem = {
      bill_no: item.bill_no,
      pdf_url: item.pdf_url,
      doctor_name: item.doctor_name,
      disease_name: diseaseName,
      data: testData.map((test: any) => {
        return {
          id: test.id,
          patient_id: test.patient_id,
          bill_id: test.bill_id,
          lab_test_id: test.lab_test_id,
          reading_value: test.reading_value,
          result: test.result,
          sample_date: test.sample_date,
          date_created: test.date_created,
          lab_test_reference_ranges: test.lab_test_reference_ranges,
          lab_ref: test.lab_ref,
          lab_test_name: test.lab_test_name,
          patient_bill: test.patient_bill,
        };
      }),
    };

    return transformedItem;
  });
  console.log(transformedData);
  return transformedData;
}
