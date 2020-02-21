package com.example.mobilelab;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;

public class RegisterActivity extends AppCompatActivity {

    EditText userName, userEmail, userPass;
    Button registerButton;

    FirebaseAuth uAuth;
    DatabaseReference uRef;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Register");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        userName = findViewById(R.id.username);
        userEmail = findViewById(R.id.email);
        userPass = findViewById(R.id.password);
        registerButton = findViewById(R.id.registerButton);

        uAuth = FirebaseAuth.getInstance();

        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String userText = userName.getText().toString();
                String emailText = userEmail.getText().toString();
                String passText = userPass.getText().toString();

                if (TextUtils.isEmpty(userText) || TextUtils.isEmpty(passText) || TextUtils.isEmpty(emailText)){
                    Toast.makeText(RegisterActivity.this, "You must enter all of your information to register", Toast.LENGTH_SHORT).show();
                }
                else if(passText.length() < 6){
                    Toast.makeText(RegisterActivity.this, "Password must be atleast 6 characters long", Toast.LENGTH_LONG).show();
                }
                else{
                    register(userText, emailText, passText);
                }
            }
        });
    }

    private void register(final String username, String email, String password){
        uAuth.createUserWithEmailAndPassword(email,password)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){
                            FirebaseUser fbUser = uAuth.getCurrentUser();
                            assert fbUser != null;
                            String userID = fbUser.getUid();
                            uRef = FirebaseDatabase.getInstance().getReference("Users").child(userID);
                            HashMap<String, String> hashMap = new HashMap<>();
                            hashMap.put("id",userID);
                            hashMap.put("username", username);
                            hashMap.put("imageURL","default");

                            uRef.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if(task.isSuccessful()){
                                        Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                                        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                                        startActivity(intent);
                                        finish();
                                    }
                                }
                            });
                    }
                        else {
                            Toast.makeText(RegisterActivity.this, "You can't register with this email/password combo..", Toast.LENGTH_SHORT).show();

                        }
                    }
                });
    }
}
