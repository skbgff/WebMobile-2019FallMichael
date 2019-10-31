package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 5;
    final int PEPPERONI_PRICE = 2;
    final int SAUSAGE_PRICE = 2;
    final int HAM_PRICE = 2;
    final int BACON_PRICE = 2;
    final String order_summary_has_pepperoni = "Has Pepperoni?";
    final String order_summary_has_sausage = "Has Sausage?";
    final String order_summary_has_ham = "Has Ham?";
    final String order_summary_has_bacon = "Has Bacon?";
    int quantity = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        /**
         * This method is called when the order button is clicked.
         */

        Button orderButton = (Button) findViewById(R.id.orderButton);

        Button summaryButton = (Button) findViewById(R.id.summaryButton);

        summaryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent summaryIntent = new Intent(MainActivity.this, SummarActivity.class);
                // get user input
                EditText userInputNameView = (EditText) findViewById(R.id.user_input);
                String userInputName = userInputNameView.getText().toString();

                // check if whipped cream is selected
                CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoniChecked);
                boolean hasPepperoni = pepperoni.isChecked();

                // check if chocolate is selected
                CheckBox sausage = (CheckBox) findViewById(R.id.sausageChecked);
                boolean hasSausage = sausage.isChecked();

                CheckBox ham = (CheckBox) findViewById(R.id.hamChecked);
                boolean hasHam = ham.isChecked();

                CheckBox bacon = (CheckBox) findViewById(R.id.baconChecked);
                boolean hasBacon = bacon.isChecked();

                // calculate and store the total price
                float totalPrice = calculatePrice(hasPepperoni, hasSausage, hasHam, hasBacon);

                String orderSummaryMessage = createOrderSummary(userInputName, hasPepperoni, hasSausage, hasHam, hasBacon, totalPrice);

                // create and store the order summary
                summaryIntent.putExtra("USER NAME", userInputName);
                summaryIntent.putExtra("INGREDIENTS", orderSummaryMessage);
                startActivity(summaryIntent);
            }
        });
    }


    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userInputName, boolean hasPepperoni, boolean hasSausage, boolean hasHam, boolean hasBacon, float price) {
        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" +
                order_summary_has_pepperoni +  boolToString(hasPepperoni) + "\n" +
                order_summary_has_sausage +  boolToString(hasSausage) + "\n" +
                order_summary_has_ham + boolToString(hasHam) + "\n" +
                order_summary_has_bacon + boolToString(hasBacon) + "\n" +
                getString(R.string.order_summary_quantity, quantity) + "\n" +
                getString(R.string.order_summary_total_price, price) + "\n" +
                getString(R.string.thank_you);
        return orderSummaryMessage;
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasPepperoni, boolean hasSausage, boolean hasHam, boolean hasBacon) {
        int basePrice = PIZZA_PRICE;
        if (hasPepperoni) {
            basePrice += PEPPERONI_PRICE;
        }
        if (hasSausage) {
            basePrice += SAUSAGE_PRICE;
        }
        if (hasHam){
            basePrice += HAM_PRICE;
        }
        if (hasBacon){
            basePrice += BACON_PRICE;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred pizzas");
            Context context = getApplicationContext();
            String lowerLimitToast = "Please choose less than one hundred pizzas";
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one pizza");
            Context context = getApplicationContext();
            String upperLimitToast = "Please select at least one pizza";
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
    public void sendEmail(View view) {
        Log.i("Send email", "");

        String[] TO = {"this417sucks@gmail.com"};
        String[] CC = {"s0720bae@gmail.com"};
        Intent emailIntent = new Intent(Intent.ACTION_SEND);
        emailIntent.setData(Uri.parse("mailto:"));
        emailIntent.setType("text/plain");


        emailIntent.putExtra(Intent.EXTRA_EMAIL, TO);
        emailIntent.putExtra(Intent.EXTRA_CC, CC);
        emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Daniel's Order");
        Intent summaryIntent = new Intent(MainActivity.this, SummarActivity.class);
        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if whipped cream is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoniChecked);
        boolean hasPepperoni = pepperoni.isChecked();

        // check if chocolate is selected
        CheckBox sausage = (CheckBox) findViewById(R.id.sausageChecked);
        boolean hasSausage = sausage.isChecked();

        CheckBox ham = (CheckBox) findViewById(R.id.hamChecked);
        boolean hasHam = ham.isChecked();

        CheckBox bacon = (CheckBox) findViewById(R.id.baconChecked);
        boolean hasBacon = bacon.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasPepperoni, hasSausage, hasHam, hasBacon);

        String orderSummaryMessage = createOrderSummary(userInputName, hasPepperoni, hasSausage, hasHam, hasBacon, totalPrice);

        emailIntent.putExtra(Intent.EXTRA_TEXT, orderSummaryMessage);

        try {
            startActivity(Intent.createChooser(emailIntent, "Send mail..."));
            finish();
            Log.i("Done sending email...", "");
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(MainActivity.this,
                    "There is no email client installed.", Toast.LENGTH_SHORT).show();
        }
    }
}