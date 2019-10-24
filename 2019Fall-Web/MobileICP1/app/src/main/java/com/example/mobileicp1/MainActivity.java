package com.example.mobileicp1;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button loginButton = (Button) findViewById(R.id.loginButton);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                EditText usernameCtrl = (EditText) findViewById(R.id.userNameText);
                EditText passwordCtrl = (EditText) findViewById(R.id.passwordText);
                String username = usernameCtrl.getText().toString();
                String password = passwordCtrl.getText().toString();

                boolean validationFlag = false;

                if (!username.isEmpty() && !password.isEmpty()) {
                    if (username.equals("Admin") && password.equals("Admin")) {
                        validationFlag = true;
                    }
                }
                if (!validationFlag) {
                    AlertDialog.Builder builder1 = new AlertDialog.Builder(MainActivity.this);
                            builder1.setTitle("Login Error");
                            builder1.setMessage("You entered a wrong password or username.");
                            builder1.setNegativeButton("okay", new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    dialogInterface.cancel();
                                }
                            }).show();

                } else {
                    Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
                    startActivity(redirect);
                }

            }
        });

    }

}

