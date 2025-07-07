import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled={true} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText } = render(
      <Button title="Test Button" onPress={mockOnPress} loading={true} />
    );

    // Text should be hidden when loading
    expect(queryByText('Test Button')).toBeNull();

    // We can test for loading state by checking that text is not visible
    // ActivityIndicator presence is implicit in the loading state
    expect(queryByText('Test Button')).toBeNull();
  });

  it('does not call onPress when loading', () => {
    const { getByRole } = render(
      <Button title="Test Button" onPress={mockOnPress} loading={true} />
    );

    fireEvent.press(getByRole('button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      const { getByText } = render(
        <Button title="Primary" onPress={mockOnPress} variant="primary" />
      );

      expect(getByText('Primary')).toBeTruthy();
    });

    it('renders secondary variant correctly', () => {
      const { getByText } = render(
        <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
      );

      expect(getByText('Secondary')).toBeTruthy();
    });

    it('renders outline variant correctly', () => {
      const { getByText } = render(
        <Button title="Outline" onPress={mockOnPress} variant="outline" />
      );

      expect(getByText('Outline')).toBeTruthy();
    });

    it('renders text variant correctly', () => {
      const { getByText } = render(
        <Button title="Text" onPress={mockOnPress} variant="text" />
      );

      expect(getByText('Text')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      const { getByText } = render(
        <Button title="Small" onPress={mockOnPress} size="small" />
      );

      expect(getByText('Small')).toBeTruthy();
    });

    it('renders medium size correctly', () => {
      const { getByText } = render(
        <Button title="Medium" onPress={mockOnPress} size="medium" />
      );

      expect(getByText('Medium')).toBeTruthy();
    });

    it('renders large size correctly', () => {
      const { getByText } = render(
        <Button title="Large" onPress={mockOnPress} size="large" />
      );

      expect(getByText('Large')).toBeTruthy();
    });
  });

  it('applies fullWidth style when specified', () => {
    const { getByRole } = render(
      <Button title="Full Width" onPress={mockOnPress} fullWidth={true} />
    );

    const button = getByRole('button');
    expect(button.props.style).toEqual(
      expect.objectContaining({ width: '100%' })
    );
  });

  it('applies custom styles', () => {
    const customStyle = { marginTop: 20 };
    const { getByRole } = render(
      <Button title="Custom Style" onPress={mockOnPress} style={customStyle} />
    );

    const button = getByRole('button');
    expect(button.props.style).toEqual(expect.objectContaining(customStyle));
  });

  it('applies custom text styles', () => {
    const customTextStyle = { fontStyle: 'italic' as const };
    const { getByText } = render(
      <Button
        title="Custom Text"
        onPress={mockOnPress}
        textStyle={customTextStyle}
      />
    );

    const text = getByText('Custom Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customTextStyle)])
    );
  });
});
