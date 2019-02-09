package com.greenkaclient;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.gamega.RNAsyncStoragePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new ImagePickerPackage(),
        new LinearGradientPackage(),
        new MainReactPackage(),
        new MapsPackage(),
        new RNAsyncStoragePackage(),
        new RNGeocoderPackage(),
        new RNGooglePlacesPackage(),
        new SnackbarPackage(),
        new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
