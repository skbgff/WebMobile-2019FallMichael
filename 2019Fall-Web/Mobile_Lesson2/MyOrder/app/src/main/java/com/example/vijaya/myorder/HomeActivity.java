package com.example.vijaya.myorder;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        String username = getIntent().getStringExtra("USER NAME");
        String summaryInfo = getIntent().getStringExtra("INGREDIENTS");


        TextView name = (TextView) findViewById(R.id.dearUserText);
        name.setText("Dear " + " " + username);
        TextView summary = (TextView) findViewById(R.id.summaryText);
        summary.setText(summaryInfo);

        Button orderButton = (Button) findViewById(R.id.goToOrderButton);

    }
    public void goToOrder (View view){
        Intent goOrderIntent = new Intent(HomeActivity.this,MainActivity.class);
        startActivity(goOrderIntent);
    }
}