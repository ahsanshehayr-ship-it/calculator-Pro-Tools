
import React from 'react';

const commonStyles = {
    paragraph: "mb-4",
    heading: "text-lg font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2",
    list: "list-disc list-inside space-y-2 mb-4",
    disclaimer: "text-sm text-slate-500 dark:text-slate-500 mt-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg"
};

export const CALCULATOR_DESCRIPTIONS: Record<string, React.ReactNode> = {
  'bmi-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Body Mass Index (BMI) Calculator is a simple tool to estimate your body fat based on your height and weight. It's widely used as a general indicator of whether you have a healthy body weight for your height.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>BMI is calculated by dividing your weight in kilograms by the square of your height in meters (kg/m²). The result is then compared against standard categories to determine your weight status.</p>
      <ul className={commonStyles.list}>
        <li><strong>Underweight:</strong> BMI less than 18.5</li>
        <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
        <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
        <li><strong>Obese:</strong> BMI 30 or greater</li>
      </ul>
      <p className={commonStyles.disclaimer}><strong>Disclaimer:</strong> BMI is a useful general guide but doesn't account for factors like muscle mass or body composition. Consult a healthcare professional for personalized advice.</p>
    </div>
  ),
  'bmr-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Basal Metabolic Rate (BMR) Calculator estimates the number of calories your body needs to function at rest. This includes basic life-sustaining functions like breathing, circulation, and cell production.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>This calculator uses the Mifflin-St Jeor Equation, a widely accepted formula, to calculate your BMR based on your age, gender, height, and weight. Knowing your BMR is the first step in managing your calorie intake for weight loss, gain, or maintenance.</p>
    </div>
  ),
  'ideal-weight-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Ideal Weight Calculator provides an estimate of a healthy body weight based on your height and gender. It serves as a general guideline, not a strict rule.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Several formulas exist to calculate ideal weight. This calculator uses the popular G.J. Hamwi formula (1964), which is a quick and simple estimation.</p>
      <p className={commonStyles.disclaimer}><strong>Note:</strong> "Ideal weight" is a concept that varies between individuals. Factors like body frame size, muscle mass, and personal health goals can influence your ideal weight. This tool should be used for informational purposes only.</p>
    </div>
  ),
  'heart-rate-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Heart Rate Calculator helps you determine your target heart rate zones for exercise. Working out in these zones can help you achieve your fitness goals more effectively, whether it's for weight loss, cardiovascular improvement, or athletic performance.</p>
      <h3 className={commonStyles.heading}>Understanding the Zones</h3>
      <ul className={commonStyles.list}>
        <li><strong>Maximum Heart Rate:</strong> The highest your heart rate should get during intense exercise. It's estimated using the formula 220 minus your age.</li>
        <li><strong>Moderate Zone (50-70% of max):</strong> Ideal for improving general fitness and burning fat.</li>
        <li><strong>Vigorous Zone (70-85% of max):</strong> Best for improving cardiovascular endurance and performance.</li>
      </ul>
    </div>
  ),
  'water-intake-calculator': (
    <div>
      <p className={commonStyles.paragraph}>This calculator provides an estimate of your recommended daily water intake to stay hydrated. Proper hydration is essential for overall health, energy levels, and bodily functions.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>The calculation is based on your weight and daily activity level. More active individuals generally require more water to compensate for fluid lost through sweat.</p>
      <p className={commonStyles.disclaimer}><strong>Note:</strong> Individual needs may vary based on climate, health conditions, and diet. This is a general recommendation.</p>
    </div>
  ),
  'loan-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Loan Calculator helps you understand the financial implications of taking out a loan. By entering the loan amount, interest rate, and term, you can see your monthly payment and the total cost of borrowing.</p>
      <h3 className={commonStyles.heading}>Key Terms Explained</h3>
      <ul className={commonStyles.list}>
        <li><strong>Monthly Payment:</strong> The fixed amount you will pay each month.</li>
        <li><strong>Total Payment:</strong> The full amount you will have paid back by the end of the loan term, including principal and interest.</li>
        <li><strong>Total Interest:</strong> The total cost of borrowing—the amount you pay on top of the original loan amount.</li>
      </ul>
    </div>
  ),
   'emi-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The EMI (Equated Monthly Installment) Calculator is designed to help you understand your monthly financial commitment for a loan. It's identical in function to the Loan Calculator.</p>
      <h3 className={commonStyles.heading}>Key Terms Explained</h3>
      <ul className={commonStyles.list}>
        <li><strong>Monthly EMI:</strong> The fixed amount you will pay each month towards your loan.</li>
        <li><strong>Total Payment:</strong> The full amount you will have paid back, including the original loan amount and all interest.</li>
        <li><strong>Total Interest:</strong> The total cost of borrowing over the loan's lifetime.</li>
      </ul>
    </div>
  ),
  'compound-interest-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Compound Interest Calculator demonstrates the power of compounding—earning returns not only on your initial investment but also on the accumulated interest. It's a key concept in long-term investing.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>The more frequently interest is compounded (e.g., monthly vs. annually), the faster your investment grows. This tool helps you visualize this growth over time.</p>
    </div>
  ),
  'simple-interest-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Simple Interest Calculator computes interest on the principal amount only, without compounding. It's often used for short-term loans or investments.</p>
      <h3 className={commonStyles.heading}>How It's Different</h3>
      <p className={commonStyles.paragraph}>Unlike compound interest, simple interest doesn't earn interest on the interest. The calculation is straightforward: Principal x Rate x Time.</p>
    </div>
  ),
  'roi-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Return on Investment (ROI) Calculator is a simple yet powerful tool to measure the profitability of an investment. It expresses the return as a percentage of the original cost.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>Enter the initial amount invested and the final amount returned. The calculator will show you the ROI, helping you compare the performance of different investments.</p>
    </div>
  ),
  'tax-calculator': (
    <div>
      <p className={commonStyles.paragraph}>This simple Tax Calculator provides a basic estimate of the tax amount on your income based on a flat tax rate. It can help you quickly understand the impact of taxes on your earnings.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Simply enter your total income and the applicable tax rate (as a percentage) to see the calculated tax amount and your net income after taxes.</p>
      <p className={commonStyles.disclaimer}><strong>Disclaimer:</strong> This is a simplified tool. Real-world tax calculations involve multiple brackets, deductions, and credits. This should not be used for tax filing or financial planning. Consult a professional for accurate advice.</p>
    </div>
  ),
  'discount-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Discount Calculator helps you quickly figure out the final price of an item after a discount is applied. It's a handy tool for shoppers during sales events.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>Enter the original price of the item and the discount percentage. The calculator will show you the amount you save and the final price you need to pay.</p>
    </div>
  ),
  'currency-converter': (
    <div>
      <p className={commonStyles.paragraph}>The Currency Converter allows you to get an approximate conversion between different world currencies based on standard exchange rates. It now supports a wide range of major global currencies to provide more comprehensive conversion options.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Enter the amount you wish to convert, select the currency you are converting from, and the currency you are converting to. The result will be displayed automatically.</p>
      <p className={commonStyles.disclaimer}><strong>Disclaimer:</strong> The exchange rates used in this calculator are for demonstration purposes only and are not updated in real-time. They should not be used for financial transactions.</p>
    </div>
  ),
  'profit-margin-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Profit Margin Calculator is an essential tool for business owners to assess the profitability of their products or services. It calculates the gross profit and the profit margin as a percentage of revenue.</p>
      <h3 className={commonStyles.heading}>Key Metrics</h3>
      <ul className={commonStyles.list}>
        <li><strong>Gross Profit:</strong> The difference between revenue and the cost of goods sold (COGS).</li>
        <li><strong>Profit Margin:</strong> The gross profit expressed as a percentage of revenue. A higher margin indicates greater profitability.</li>
      </ul>
    </div>
  ),
  'break-even-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Break-Even Calculator helps businesses determine the number of units they need to sell to cover all their costs. At the break-even point, a company's total revenue equals its total expenses.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>By inputting your fixed costs, variable cost per unit, and selling price per unit, you can find the exact sales volume needed to avoid a loss.</p>
    </div>
  ),
  'sip-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The SIP (Systematic Investment Plan) Calculator helps you project the future value of your monthly investments. It illustrates how small, regular investments can grow into a significant amount over time due to the power of compounding.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>Enter your monthly investment amount, the expected annual return rate, and the number of years you plan to invest. The calculator will estimate your total investment, wealth gained, and the final maturity amount.</p>
    </div>
  ),
  'age-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Age Calculator determines your exact age by calculating the time elapsed from your date of birth to the current date.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Simply enter your date of birth, and the calculator will provide your age in years, months, and days, giving you a precise measure of your age.</p>
    </div>
  ),
  'date-difference-calculator': (
    <div>
      <p className={commonStyles.paragraph}>This calculator computes the duration between two dates. It's useful for tracking project timelines, counting down to an event, or calculating age.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Select a start date and an end date. The calculator will display the difference in terms of years, months, and days, as well as the total number of days between the two points in time.</p>
    </div>
  ),
  'tip-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Tip Calculator makes it easy to calculate the appropriate tip for service at a restaurant or bar. It also helps you split the total bill evenly among a group of people.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>Enter the total bill amount, choose your desired tip percentage, and specify the number of people sharing the bill. The calculator will show the tip amount, the total bill, and how much each person should pay.</p>
    </div>
  ),
  'fuel-consumption-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Fuel Consumption Calculator helps you measure your vehicle's fuel efficiency. Understanding your car's consumption rate can help you manage your fuel budget and identify potential mechanical issues.</p>
      <h3 className={commonStyles.heading}>Common Metrics</h3>
      <ul className={commonStyles.list}>
        <li><strong>L/100km:</strong> Liters of fuel used per 100 kilometers traveled. (Lower is better)</li>
        <li><strong>km/L:</strong> Kilometers traveled per liter of fuel. (Higher is better)</li>
      </ul>
    </div>
  ),
  'travel-time-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Travel Time Calculator estimates how long a trip will take based on the distance and your average speed. It's useful for planning road trips and estimating arrival times.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Input the total distance of your journey and the average speed you expect to maintain. The calculator uses the formula Time = Distance / Speed to give you an estimated travel duration.</p>
    </div>
  ),
  'standard-calculator': (
    <div>
      <p className={commonStyles.paragraph}>A straightforward calculator for performing basic arithmetic operations. It's perfect for quick, everyday calculations.</p>
      <h3 className={commonStyles.heading}>Features</h3>
      <ul className={commonStyles.list}>
        <li>Addition (+), Subtraction (-), Multiplication (×), and Division (÷).</li>
        <li>Clear (C) and Backspace (DEL) functions for easy corrections.</li>
      </ul>
    </div>
  ),
  'scientific-calculator': (
    <div>
      <p className={commonStyles.paragraph}>An advanced calculator designed for scientific, engineering, and mathematical problems. It includes a wider range of functions beyond basic arithmetic.</p>
      <h3 className={commonStyles.heading}>Features</h3>
      <ul className={commonStyles.list}>
        <li>Trigonometric functions (sin, cos, tan) with Radian/Degree modes.</li>
        <li>Logarithms (log, ln), square roots (√), and exponents (^).</li>
        <li>Parentheses for grouping operations.</li>
      </ul>
    </div>
  ),
  'unit-converter': (
    <div>
      <p className={commonStyles.paragraph}>A versatile tool to convert measurements from one unit to another across various categories like length, weight, and temperature.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>First, select a category of measurement. Then, enter your value and choose the units you are converting from and to. The result is calculated automatically.</p>
    </div>
  ),
  'percentage-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Percentage Calculator is a flexible tool for handling all types of percentage problems. It offers three different calculation modes to suit your needs.</p>
      <h3 className={commonStyles.heading}>Calculation Modes</h3>
      <ul className={commonStyles.list}>
        <li><strong>What is X% of Y?</strong> - Calculates a percentage of a given number.</li>
        <li><strong>X is what percent of Y?</strong> - Determines the percentage one number represents of another.</li>
        <li><strong>Percentage change from X to Y</strong> - Calculates the percentage increase or decrease between two numbers.</li>
      </ul>
    </div>
  ),
  'gpa-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The GPA (Grade Point Average) Calculator helps students track their academic performance. It calculates your GPA based on the grades and credits of your courses.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>For each course, enter the number of credits and the letter grade received. The calculator uses a standard 4.0 scale to compute your overall GPA. You can add or remove courses as needed.</p>
    </div>
  ),
  'grade-percentage-calculator': (
    <div>
      <p className={commonStyles.paragraph}>This calculator quickly converts a test or assignment score into a percentage and provides a corresponding letter grade based on a standard scale.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Enter the score you received and the total possible score. The calculator will instantly show your performance as a percentage and a letter grade (e.g., A, B, C).</p>
    </div>
  ),
  'paint-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Paint Calculator helps you estimate the amount of paint required for your project, preventing you from buying too much or too little.</p>
      <h3 className={commonStyles.heading}>How to Use It</h3>
      <p className={commonStyles.paragraph}>Enter the total surface area you need to paint, the number of coats you plan to apply, and the coverage rate of your paint (usually found on the paint can, typically around 10 m²/liter). The tool will tell you the total liters of paint needed.</p>
    </div>
  ),
  'tile-calculator': (
    <div>
      <p className={commonStyles.paragraph}>The Tile Calculator helps you estimate the number of tiles needed to cover a floor or wall. It includes an option to account for wastage, which is crucial for cutting and fitting.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Input the dimensions of the area you are tiling and the dimensions of a single tile. It's recommended to add 10-15% for wastage to account for cuts, breaks, and mistakes.</p>
    </div>
  ),
  'concrete-volume-calculator': (
    <div>
      <p className={commonStyles.paragraph}>This calculator helps you determine the volume of concrete needed for a rectangular slab, such as a foundation, patio, or sidewalk.</p>
      <h3 className={commonStyles.heading}>How It Works</h3>
      <p className={commonStyles.paragraph}>Enter the length, width, and thickness of the area you need to fill. The calculator will compute the total volume of concrete required in cubic meters, ensuring you order the right amount for your construction project.</p>
    </div>
  ),
};
