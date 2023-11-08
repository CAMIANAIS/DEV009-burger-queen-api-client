import { DataService, formatCurrentDateTime } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format current date and time', () => {
    const formattedDateTime = service.getCurrentDateTimeFormatted();
    const expectedFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // A regular expression to match the expected format

    expect(formattedDateTime).toMatch(expectedFormat);
  });

  it('should format current date and time using formatCurrentDateTime', () => {
    const formattedDateTime = formatCurrentDateTime();
    const expectedFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/; // A regular expression to match the expected format

    expect(formattedDateTime).toMatch(expectedFormat);
  });
});
